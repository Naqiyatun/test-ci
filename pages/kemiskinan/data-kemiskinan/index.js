import { Container } from '@mui/material';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react'
import { Context } from '../../../config/context'
import FormSimpleSearch from '../../../components/FormSimpleSearch';
import useDidMountEffect from '../../../utils/DidMountEffect';
import TombolKembali from '../../../components/TombolKembali';
import JudulDanSumber from '../../../components/JudulDanSumber';

const DataKemiskinan = () => {
	const context = useContext(Context);
	const isLoadKemiskinan = context.isLoadKemiskinan;
	const setIsLoadKemiskinan = context.setIsLoadKemiskinan;
	const dataKemiskinan = context.dataKemiskinan;
	const setDataKemiskinan = context.setDataKemiskinan;
	const getKemiskinan = context.getKemiskinan;
	const listTahun = context.listTahun;
	const generateYearsBetween = context.generateYearsBetween;
    const currentYear = new Date().getFullYear();
    const [search, setSearch] = useState()
    const [selectedYear, setSelectedYear] = useState(currentYear)

    useEffect(() => {
        getKemiskinan(currentYear)
        generateYearsBetween(3)
    }, [])

    useDidMountEffect(() => {
        const searchData = async () => {
            setIsLoadKemiskinan(true)
            try {
                const response = await axios.get(`${process.env.base_url}/data-kemiskinans?filters[tahun][$eq]=${selectedYear}&sort[0]=kecamatan%3Aasc&pagination[pageSize]=25&filters[$or][0][kecamatan][$containsi]=${search}&filters[$or][1][nama_kelurahan][$containsi]=${search}&populate=*`, { headers: { Authorization: `Bearer ${process.env.base_token}` } });
                
                if (response) {
                    setIsLoadKemiskinan(false)
                    setDataKemiskinan(response.data.data)
                }
            } catch (err) {
                console.log(err)
            }
        }
        if (!search) {
            getKemiskinan(selectedYear)
        } else {
            searchData()
        }
    }, [search])

	return (
		<Container fixed>
            <div className='halaman_data template_menu'>
                <TombolKembali link='/kemiskinan' />
                <div className='box_data'>
                    <JudulDanSumber judul='Data Kemiskinan Kota Palembang' sumber='Bagian Perekonomian Sekretariat Daerah Kota Palembang' />
                    <FormSimpleSearch placeholder='Cari kecamatan/ kelurahan' action={(e) => setSearch(e.target.value)} id='Search' />
                    <div className='flex_filter'>
                        <h6 className='h6_small'>Filter Tahun</h6>
                        <div className='flex_menu_filter'>
                            {listTahun.map((dt, i) => (
                                <button type='button' onClick={() => {setSelectedYear(dt); getKemiskinan(dt)}} className={'p_small btn_menu_filter ' + (selectedYear === dt ? 'active' : 'inactive')} key={i}>{dt}</button>
                            ))}
                        </div>
                    </div>
                    <div className='overflow_x_auto'>
                        <table className="table_decorative">
                            <thead>
                                <tr>
                                    <th>Kecamatan</th>
                                    <th>Kelurahan</th>
                                    <th>Kepala Keluarga</th>
                                    <th>Jiwa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(isLoadKemiskinan) ? (
                                    <tr>
                                        <td colSpan={4} style={{padding: '50px', textAlign: 'center'}}>Loading..</td>
                                    </tr>
                                ) : (
                                    (dataKemiskinan.length < 1) ? (
                                        <tr>
                                            <td colSpan={4} style={{padding: '50px', textAlign: 'center'}}>Maaf, data tidak tersedia.</td>
                                        </tr>
                                    ) : (
                                        dataKemiskinan.map((dt, i) => (
                                            <tr key={i}>
                                                <td className='no_wrap'>{dt.attributes.kecamatan}</td>
                                                <td className='no_wrap'>{dt.attributes.nama_kelurahan}</td>
                                                <td>{dt.attributes.kepala_keluarga}</td>
                                                <td>{dt.attributes.jiwa}</td>
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

export default DataKemiskinan