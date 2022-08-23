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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


const theme = createTheme();

export default function Main() {

    const [num,  setNum] = React.useState(1);
    const [btnDisabled, setBtnDisabled] = React.useState(false);
    const [URL, setURL] = React.useState("");

    const handleChange = (evt) => {
        //console.debug(evt.target.value);
        setNum(evt.target.value);
        setURL("./service/make.php?num="+evt.target.value);

    }

    const handleClick = async () => {
        setBtnDisabled(true);
        let params = new URLSearchParams();
        params.append("num", num);

        const res = await axios
            .post("./service/make.php", params)
            .catch((err) => {
                return err.response;
            });
        if (res.status != 200) {
            console.log("-- ERROR --");
            setBtnDisabled(false);

        } else {
            if (res.data.status === "error") {
                // エラー表示
            } else {
//                console.debug(res.data);
//                let data = JSON.stringify(res.data);
                //BOMを付与する（Excelでの文字化け対策）
                const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
                const blob = new Blob([bom, res.data], { type: "application/octet-stream" });
                //const blob = new Blob([bom, data]);
                //ダウンロード
                saveAs(blob, `csv_${num}.csv`);
                setBtnDisabled(false);

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
                        GEO CSV Maker
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
                            住所と座標を含んだCSVファイルを生成します。<br/>
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
                                label="レコード数(<10000)"
                                value={num}
                                onChange={handleChange}
                                size="small"
                            />
                            <Box>
                            {/*<Button variant="contained" onClick={handleClick} disabled={btnDisabled}>make</Button>*/}
                            <Button target="_blank"　href={URL} variant="contained" disabled={btnDisabled}>make</Button>
                            </Box>
                        </Stack>
                    </Container>
                </Box>
            </main>
            {/* End footer */}
        </ThemeProvider>
    );
}
