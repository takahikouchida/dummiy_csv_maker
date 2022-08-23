<?php
$input_num = $_REQUEST["num"];
$is_sjis =$_REQUEST["isSJIS"];
if(!is_numeric($input_num)) {
	exit;
}
if($input_num>1000001) {
	exit;
}
// db connect
$dbconn = pg_connect("host=host.docker.internal port=5432 dbname=gaiku user=postgres password=postgres");

$sql = "select max(id) as recode_num from address";
$result = pg_query($dbconn, $sql);
$recode = pg_fetch_array($result);

$recode_num = $recode["recode_num"];

// ランダムに選択された市区町村コードに紐づく町丁目を取得しランダムに1件取得
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename='.basename($input_num.".csv"));

echo "id,住所,経度,緯度\n";
for($i = 1;$i <= $input_num;$i++)
{
	$sql = "select * from address where id=".mt_rand(1, $recode_num);
	$result = pg_query($dbconn, $sql);
	$recode = pg_fetch_array($result);
	echo $i.",".$recode["都道府県名"].$recode["都道府県名"].$recode["市区町村名"].$recode["大字町丁目名"].",".$recode["経度"].",".$recode["緯度"]."\n";
	flush();
	ob_flush();
}

/**
Array
(
[0] =>
[都道府県コード] =>
[1] => 宮崎県
[都道府県名] => 宮崎県
[2] =>
[市区町村コード] =>
[3] => 宮崎市
[市区町村名] => 宮崎市
[4] => 452010001001
[大字町丁目コード] => 452010001001
[5] => 青島一丁目
[大字町丁目名] => 青島一丁目
[6] => 31.803978
[緯度] => 31.803978
[7] => 131.464137
[経度] => 131.464137
[8] =>
[原典資料コード] =>
[9] =>
[大字・字・丁目区分コード] =>
)
*/


?>