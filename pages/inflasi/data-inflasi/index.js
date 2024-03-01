import { Container } from '@mui/material';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react'
import { Context } from '../../../config/context'
import TombolKembali from '../../../components/TombolKembali';
import JudulDanSumber from '../../../components/JudulDanSumber';

const DataInflasi = () => {
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

	return (
		<Container fixed>
            <div className='halaman_data template_menu'>
                <TombolKembali link='/inflasi' />
                <div className='box_data'>
                    <JudulDanSumber judul='Data Inflasi Kota Palembang' sumber='Bappeda Litbang Kota Palembang' />
                    <div className='flex_filter'>
                        <h6 className='h6_small'>Pilih Tahun</h6>
                        <div className='input_filter'>
                            <input className='p_small' type="month" onChange={(e) => filterPeriode(e.target.value)} value={selectedMonthYear} />
                        </div>
                    </div>
                    <div className='overflow_x_auto'>
                        <table className="table_decorative">
                            <thead>
                                <tr>
                                    <th>Penyebab Deflasi</th>
                                    <th>Persentase</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(isLoadInflasi) ? (
                                    <tr>
                                        <td colSpan={2} style={{padding: '50px', textAlign: 'center'}}>Loading..</td>
                                    </tr>
                                ) : (
                                    (dataInflasi.length < 1) ? (
                                        <tr>
                                            <td colSpan={2} style={{padding: '50px', textAlign: 'center'}}>Maaf, data tidak tersedia.</td>
                                        </tr>
                                    ) : (
                                        dataInflasi[0].attributes.penyebab_deflasi.map((dt, i) => (
                                            <tr key={i}>
                                                <td className='no_wrap' style={{width: '50%'}}>{dt.penyebab}</td>
                                                <td className='no_wrap' style={{width: '50%'}}>{dt.persentase}</td>
                                            </tr>
                                        ))
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className='overflow_x_auto'>
                        <table className="table_decorative">
                            <thead>
                                <tr>
                                    <th>Penyebab Inflasi</th>
                                    <th>Persentase</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(isLoadInflasi) ? (
                                    <tr>
                                        <td colSpan={2} style={{padding: '50px', textAlign: 'center'}}>Loading..</td>
                                    </tr>
                                ) : (
                                    (dataInflasi.length < 1) ? (
                                        <tr>
                                            <td colSpan={2} style={{padding: '50px', textAlign: 'center'}}>Maaf, data tidak tersedia.</td>
                                        </tr>
                                    ) : (
                                        dataInflasi[0].attributes.penyebab_inflasi.map((dt, i) => (
                                            <tr key={i}>
                                                <td className='no_wrap' style={{width: '50%'}}>{dt.penyebab}</td>
                                                <td className='no_wrap' style={{width: '50%'}}>{dt.persentase}</td>
                                            </tr>
                                        ))
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
		</Container>
	)
}

export default DataInflasi