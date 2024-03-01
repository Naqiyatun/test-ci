import { Container } from '@mui/material';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react'
import { Context } from '../../../config/context'
import MultitypeChart from '../../../components/MultitypeChart';
import JudulDanSumber from '../../../components/JudulDanSumber';
import TombolKembali from '../../../components/TombolKembali';

const DataStunting = () => {
	const context = useContext(Context);
	const listTahun = context.listTahun;
	const generateYearsBetween = context.generateYearsBetween;
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear)
    const [dataStunting, setDataStunting] = useState([])
    const [isLoadStunting, setIsLoadStunting] = useState(true)
    const [sumDataStunting, setSumDataStunting] = useState([])

    const getStunting = async (tahun) => {
        setIsLoadStunting(true)
        try {
            const response = await axios.get(`${process.env.base_url}/data-stuntings?filters[tahun][$eq]=${tahun}&sort[0]=kecamatan%3Aasc&pagination[pageSize]=300&populate=*`, { headers: { Authorization: `Bearer ${process.env.base_token}` } });
            
            if (response) {
                setDataStunting(response.data.data)
                const respData = response.data.data
                let sumJan = 0;
                for (let i = 0; i < respData.length; i++ ) {
                    sumJan += parseInt(respData[i].attributes.jumlah_balita_stunting.jan);
                }
                let sumFeb = 0;
                for (let i = 0; i < respData.length; i++ ) {
                    sumFeb += parseInt(respData[i].attributes.jumlah_balita_stunting.feb);
                }
                let sumMar = 0;
                for (let i = 0; i < respData.length; i++ ) {
                    sumMar += parseInt(respData[i].attributes.jumlah_balita_stunting.mar);
                }
                let sumApr = 0;
                for (let i = 0; i < respData.length; i++ ) {
                    sumApr += parseInt(respData[i].attributes.jumlah_balita_stunting.april);
                }
                let sumMei = 0;
                for (let i = 0; i < respData.length; i++ ) {
                    sumMei += parseInt(respData[i].attributes.jumlah_balita_stunting.mei);
                }
                let sumJuni = 0;
                for (let i = 0; i < respData.length; i++ ) {
                    sumJuni += parseInt(respData[i].attributes.jumlah_balita_stunting.juni);
                }
                let sumJuli = 0;
                for (let i = 0; i < respData.length; i++ ) {
                    sumJuli += parseInt(respData[i].attributes.jumlah_balita_stunting.juli);
                }
                let sumAgu = 0;
                for (let i = 0; i < respData.length; i++ ) {
                    sumAgu += parseInt(respData[i].attributes.jumlah_balita_stunting.agt);
                }
                let sumSep = 0;
                for (let i = 0; i < respData.length; i++ ) {
                    sumSep += parseInt(respData[i].attributes.jumlah_balita_stunting.sept);
                }
                let sumOkt = 0;
                for (let i = 0; i < respData.length; i++ ) {
                    sumOkt += parseInt(respData[i].attributes.jumlah_balita_stunting.okt);
                }
                let sumNov = 0;
                for (let i = 0; i < respData.length; i++ ) {
                    sumNov += parseInt(respData[i].attributes.jumlah_balita_stunting.nov);
                }
                let sumDes = 0;
                for (let i = 0; i < respData.length; i++ ) {
                    sumDes += parseInt(respData[i].attributes.jumlah_balita_stunting.des);
                }
                setSumDataStunting([sumJan, sumFeb, sumMar, sumApr, sumMei, sumJuni, sumJuli, sumAgu, sumSep, sumOkt, sumNov, sumDes])
                // console.log('total', sumJan, sumFeb, sumMar, sumApr, sumMei, sumJuni, sumJuli, sumAgu, sumSep, sumOkt, sumNov, sumDes)
                setIsLoadStunting(false)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        generateYearsBetween(3)
        getStunting(currentYear)
    }, [])

    // console.log('sumDataStunting', sumDataStunting)
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

    const data = {
        labels,
        datasets: [
            {
                type: 'line',
                label: 'line',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                fill: false,
                data: sumDataStunting,
            },
            {
                type: 'bar',
                label: 'bar',
                backgroundColor: '#165BAA',
                data: sumDataStunting,
                borderColor: 'white',
                borderWidth: 2,
            }
        ],
    };

	return (
		<Container fixed>
            <div className='halaman_data template_menu'>
                <TombolKembali link='/stunting' />
                <div className='box_data'>
                    <JudulDanSumber judul='Grafik Stunting Kota Palembang' sumber='Dinas Kesehatan Kota Palembang' />
                    <div className='flex_filter'>
                        <h6 className='h6_small'>Filter Tahun</h6>
                        <div className='flex_menu_filter'>
                            {listTahun.map((dt, i) => (
                                <button type='button' onClick={() => {setSelectedYear(dt); getStunting(dt)}} className={'p_small btn_menu_filter ' + (selectedYear === dt ? 'active' : 'inactive')} key={i}>{dt}</button>
                            ))}
                        </div>
                    </div>
                    {(isLoadStunting) ? (
                        <p className='p_normal' style={{padding: '50px', textAlign: 'center'}}>Loading..</p>
                    ) : (
                        (dataStunting.length < 1) ? (
                            <p className='p_normal' style={{padding: '50px', textAlign: 'center'}}>Maaf, data tidak tersedia.</p>
                        ) : (
                            <MultitypeChart data={data} />
                        )
                    )}
                </div>
            </div>
		</Container>
	)
}

export default DataStunting