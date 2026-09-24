<?php
// Receives a selection from index.html and emails it via Hostinger's mail().

$TO   = 'norka@vipminds.com';     // where selections are delivered
$FROM = 'norka@vipmindslb.com';   // must be an email account on vipmindslb.com

header('Content-Type: application/json; charset=utf-8');

function reply($code, $data) { http_response_code($code); echo json_encode($data); exit; }
function oneLine($s, $max) { return mb_substr(trim(preg_replace('/[\r\n\t]+/', ' ', (string)$s)), 0, $max); }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(405, ['success' => false, 'message' => 'Method not allowed.']);

$in = json_decode(file_get_contents('php://input'), true);
if (!is_array($in)) reply(400, ['success' => false, 'message' => 'Invalid request.']);

// Honeypot: real users never tick this hidden box.
if (!empty($in['botcheck'])) reply(200, ['success' => true]);

$name    = oneLine($in['name'] ?? '', 120);
$count   = max(0, min(8, (int)($in['count'] ?? 0)));
$message = mb_substr((string)($in['message'] ?? ''), 0, 20000);

if ($name === '')           reply(400, ['success' => false, 'message' => 'Please add your name.']);
if (trim($message) === '')  reply(400, ['success' => false, 'message' => 'Nothing to send.']);

$subject = "BDF × Mzaar selection from $name ($count of 8 ideas)";
$headers = implode("\r\n", [
  'From: BDF x Mzaar Picker <' . $FROM . '>',
  'Reply-To: ' . $FROM,
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'Content-Transfer-Encoding: 8bit',
]);

$ok = mail($TO, '=?UTF-8?B?' . base64_encode($subject) . '?=', $message, $headers, '-f' . $FROM);

if (!$ok) reply(502, ['success' => false, 'message' => 'Could not send right now.']);
reply(200, ['success' => true]);
