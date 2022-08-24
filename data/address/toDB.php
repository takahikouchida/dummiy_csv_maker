<?php

$target = $argv[1];

file_put_contents($target."_utf",mb_convert_encoding(file_get_contents($target),"UTF-8", "SJIS-win"));

$isHeader = true;
$fp = fopen($target."_utf", 'r');
while($data = fgetcsv($fp))
{
	if ( ! $isHeader)
	{

		if(!array_key_exists(7,$data)) {
			print_r($data);
			exit;
		}

		$sql = "INSERT INTO public.address(\"都道府県名\",\"市区町村コード\",\"市区町村名\",\"大字町丁目コード\",\"大字町丁目名\",\"緯度\",\"経度\")VALUES ('" . $data[1] . "', '" . $data[2] . "', '" . $data[3] . "', '" . $data[4] . "', '" . $data[5]. "', " . $data[6] . ", " . $data[7] . " );
";
		echo $sql;
	} else {
		$isHeader = false;
	}
}
fclose($fp);

/**
0	都道府県コード
1	都道府県名
2	市区町村コード
3	市区町村名
4	大字町丁目コード
5	大字町丁目名
6	緯度
7	経度
8	原典資料コード
9	大字・字・丁目区分コード
*/


?>