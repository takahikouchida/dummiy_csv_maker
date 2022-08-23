CREATE TABLE IF NOT EXISTS public.address
(
    id serial,
    "都道府県コード" character varying(100) ,
    "都道府県名" character varying(100) ,
    "市区町村コード" character varying(100) ,
    "市区町村名" character varying(100) ,
    "大字町丁目コード" character varying(100) ,
    "大字町丁目名" character varying(100) ,
    "緯度" double precision ,
    "経度" double precision ,
    "原典資料コード" character varying(100) ,
    "大字・字・丁目区分コード" character varying(100)
);

