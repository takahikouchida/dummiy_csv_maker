import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SiteIcon from '@mui/icons-material/FileCopy';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { saveAs } from 'file-saver'

const theme = createTheme();

export default function Main() {

    const [num, setNum] = React.useState(1);

    const handleChange = (evt) => {
        //console.debug(evt.target.value);
        setNum(evt.target.value);
    }

    const handleClick = async () => {
        let params = new URLSearchParams();
        params.append("num", num);

        const res = await axios
            .post("./service/make.php", params)
            .catch((err) => {
                return err.response;
            });
        if (res.status != 200) {
            // 例外発生時の処理
            console.log("例外発生時の処理");
        } else {
            if (res.data.status === "error") {
                // エラー表示
            } else {
                console.debug(res.data);
                let data = JSON.stringify(res.data);
                //BOMを付与する（Excelでの文字化け対策）
                const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
                const blob = new Blob([bom, data], { type: "application/json" });
                //ダウンロード
                saveAs(blob, `csv_${num}.geojson`);
            }
        }
    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <SiteIcon sx={{ mr: 2 }}  />
                    <Typography variant="h6" color="inherit" noWrap>
                        Dummy CSV Maker
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        pt: 4,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="md">

                        <Typography variant="h6" align="center" color="text.secondary" paragraph>
                            ニセ個人情報CSVファイルを生成します。<br/>
                        </Typography>

                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <TextField
                                required
                                type="number"
                                id="outlined-name"
                                label="レコード数（１万件まで）"
                               value={num}
                               onChange={handleChange}
                                size="small"
                            />

                            <Button variant="contained" onClick={handleClick} >make</Button>
                        </Stack>
                    </Container>
                </Box>
            </main>
            {/* End footer */}
        </ThemeProvider>
    );
}
