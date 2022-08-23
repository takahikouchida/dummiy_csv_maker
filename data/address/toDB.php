<?php

$target = $argv[1];

$isHeader = true;
$fp = fopen($target, 'r');
while($data = fgetcsv($fp))
{
	if ( ! $isHeader)
	{
$sql = "INSERT INTO public.address(\"都道府県名\",\"市区町村コード\",\"市区町村名\",\"大字町丁目コード\",\"大字町丁目名\",\"緯度\",\"経度\")VALUES (
'" . mb_convert_encoding($data[1], "UTF-8", "SJIS-win") . "', 
'" . mb_convert_encoding($data[2], "UTF-8", "SJIS-win") . "', 
'" . mb_convert_encoding($data[3], "UTF-8", "SJIS-win") . "', 
'" . mb_convert_encoding($data[4], "UTF-8", "SJIS-win") . "', 
'" . mb_convert_encoding($data[5], "UTF-8", "SJIS-win") . "', 
" . $data[6] . ", 
" . $data[7] . " );
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