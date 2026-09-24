<?php
// Receives a selection from index.html and emails it through Google Workspace SMTP,
// sending as marketing@vipminds.com. Credentials live in config.php (not in git).

$TO        = 'norka@vipminds.com';
$FROM      = 'marketing@vipminds.com';
$FROM_NAME = 'BDF x Mzaar Picker';

header('Content-Type: application/json; charset=utf-8');

function reply($code, $data) { http_response_code($code); echo json_encode($data); exit; }
function oneLine($s, $max) { return mb_substr(trim(preg_replace('/[\r\n\t]+/', ' ', (string)$s)), 0, $max); }

function smtpSend($user, $pass, $from, $fromName, $to, $subject, $body) {
  $fp = @stream_socket_client('ssl://smtp.gmail.com:465', $errno, $errstr, 15);
  if (!$fp) { error_log("SMTP connect failed: $errstr ($errno)"); return false; }
  stream_set_timeout($fp, 15);

  $read = function () use ($fp) {
    $data = '';
    while (($line = fgets($fp, 515)) !== false) { $data .= $line; if (isset($line[3]) && $line[3] === ' ') break; }
    return $data;
  };
  $cmd = function ($c, $expect) use ($fp, $read) {
    if ($c !== null) fwrite($fp, $c . "\r\n");
    $r = $read();
    if ((int)substr($r, 0, 3) !== $expect) throw new Exception(trim($r));
  };

  try {
    $cmd(null, 220);
    $cmd('EHLO mzaar.vipmindslb.com', 250);
    $cmd('AUTH LOGIN', 334);
    $cmd(base64_encode($user), 334);
    $cmd(base64_encode($pass), 235);
    $cmd("MAIL FROM:<$from>", 250);
    $cmd("RCPT TO:<$to>", 250);
    $cmd('DATA', 354);
    $msg = "From: $fromName <$from>\r\n"
         . "To: <$to>\r\n"
         . 'Subject: =?UTF-8?B?' . base64_encode($subject) . "?=\r\n"
         . 'Date: ' . date('r') . "\r\n"
         . 'Message-ID: <' . bin2hex(random_bytes(12)) . "@vipminds.com>\r\n"
         . "MIME-Version: 1.0\r\n"
         . "Content-Type: text/plain; charset=UTF-8\r\n"
         . "Content-Transfer-Encoding: base64\r\n\r\n"
         . chunk_split(base64_encode($body));
    fwrite($fp, $msg . "\r\n.\r\n");
    $cmd(null, 250);
    fwrite($fp, "QUIT\r\n");
    fclose($fp);
    return true;
  } catch (Exception $e) {
    error_log('SMTP error: ' . $e->getMessage());
    fclose($fp);
    return false;
  }
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(405, ['success' => false, 'message' => 'Method not allowed.']);

$in = json_decode(file_get_contents('php://input'), true);
if (!is_array($in)) reply(400, ['success' => false, 'message' => 'Invalid request.']);

// Honeypot: real users never tick this hidden box.
if (!empty($in['botcheck'])) reply(200, ['success' => true]);

$name    = oneLine($in['name'] ?? '', 120);
$count   = max(0, min(8, (int)($in['count'] ?? 0)));
$message = mb_substr((string)($in['message'] ?? ''), 0, 20000);

if ($name === '')          reply(400, ['success' => false, 'message' => 'Please add your name.']);
if (trim($message) === '') reply(400, ['success' => false, 'message' => 'Nothing to send.']);

$config = @include __DIR__ . '/config.php';
if (!is_array($config) || empty($config['smtp_pass'])) {
  error_log('config.php missing or incomplete');
  reply(500, ['success' => false, 'message' => 'Sending is not configured yet.']);
}

$ok = smtpSend($FROM, $config['smtp_pass'], $FROM, $FROM_NAME, $TO,
  "BDF × Mzaar selection from $name ($count of 8 ideas)", $message);

if (!$ok) reply(502, ['success' => false, 'message' => 'Could not send right now.']);
reply(200, ['success' => true]);
