import { Container } from '@mui/material';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react'
import { Context } from '../../../config/context'
import MultitypeChart from '../../../components/MultitypeChart';
import TombolKembali from '../../../components/TombolKembali';
import JudulDanSumber from '../../../components/JudulDanSumber';

const GrafikInflasi = () => {
	const context = useContext(Context);
	const isLoadInflasi = context.isLoadInflasi;
	const setIsLoadInflasi = context.setIsLoadInflasi;
	const dataInflasi = context.dataInflasi;
	const setDataInflasi = context.setDataInflasi;
	const getInflasi = context.getInflasi;

    const currentYear = new Date().getFullYear();
    const month = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
    const monthNum = ["01","02","03","04","05","06","07","08","09","10","11","12"];
    const d = new Date().getMonth();
    const currentMonth = month[d];
    const currentMonthNum = monthNum[d];
    const [selectedMonthYear, setSelectedMonthYear] = useState(currentYear + '-' + currentMonthNum)

    useEffect(() => {
        getInflasi(currentYear, currentMonth)
    }, [])

    const filterPeriode = async (x) => {
        setSelectedMonthYear(x)
        const m = parseInt(x.slice(-2)) - 1
        const y = x.slice(0, 4)
        const mStr = month[m]
        setIsLoadInflasi(true)
        try {
            const response = await axios.get(`${process.env.base_url}/data-inflasis?filters[tahun][$eq]=${y}&filters[bulan][$eq]=${mStr}&populate=*`, { headers: { Authorization: `Bearer ${process.env.base_token}` } });
            
            if (response) {
                setIsLoadInflasi(false)
                setDataInflasi(response.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const penyebabDeflasi = dataInflasi[0]?.attributes?.penyebab_deflasi.map((dt) => dt.penyebab);
    const persentaseDeflasi = dataInflasi[0]?.attributes?.penyebab_deflasi.map((dt) => dt.persentase);
    const penyebabInflasi = dataInflasi[0]?.attributes?.penyebab_inflasi.map((dt) => dt.penyebab);
    const persentaseInflasi = dataInflasi[0]?.attributes?.penyebab_inflasi.map((dt) => dt.persentase);

    const dtDeflasi = {
        labels: penyebabDeflasi,
        datasets: [
            {
                type: 'line',
                label: 'line',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                fill: false,
                data: persentaseDeflasi,
            },
            {
                type: 'bar',
                label: 'bar',
                backgroundColor: '#165BAA',
                data: persentaseDeflasi,
                borderColor: 'white',
                borderWidth: 2,
            }
        ],
    };

    const dtInflasi = {
        labels: penyebabInflasi,
        datasets: [
            {
                type: 'line',
                label: 'line',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                fill: false,
                data: persentaseInflasi,
            },
            {
                type: 'bar',
                label: 'bar',
                backgroundColor: '#165BAA',
                data: persentaseInflasi,
                borderColor: 'white',
                borderWidth: 2,
            }
        ],
    };

	return (
		<Container fixed>
            <div className='halaman_data template_menu'>
                <TombolKembali link='/inflasi' />
                <div className='box_data'>
                    <JudulDanSumber judul='Grafik Inflasi Kota Palembang' sumber='Bappeda Litbang Kota Palembang' />
                    <div className='flex_filter'>
                        <h6 className='h6_small'>Pilih Tahun</h6>
                        <div className='input_filter'>
                            <input className='p_small' type="month" onChange={(e) => filterPeriode(e.target.value)} value={selectedMonthYear} />
                        </div>
                    </div>
                    <h6 className='h6_normal text_center'>Persentase Penyebab Deflasi</h6>
                    {(isLoadInflasi) ? (
                        <p className='p_normal' style={{padding: '50px', textAlign: 'center'}}>Loading..</p>
                    ) : (
                        (dataInflasi.length < 1) ? (
                            <p className='p_normal' style={{padding: '50px', textAlign: 'center'}}>Maaf, data tidak tersedia.</p>
                        ) : (
                            <MultitypeChart data={dtDeflasi} />
                        )
                    )}
                    <h6 className='h6_normal text_center'>Persentase Penyebab Inflasi</h6>
                    {(isLoadInflasi) ? (
                        <p className='p_normal' style={{padding: '50px', textAlign: 'center'}}>Loading..</p>
                    ) : (
                        (dataInflasi.length < 1) ? (
                            <p className='p_normal' style={{padding: '50px', textAlign: 'center'}}>Maaf, data tidak tersedia.</p>
                        ) : (
                            <MultitypeChart data={dtInflasi} />
                        )
                    )}
                </div>
            </div>
		</Container>
	)
}

export default GrafikInflasi