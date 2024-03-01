import { Container } from '@mui/material';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react'
import { Context } from '../../../config/context'
import FormSimpleSearch from '../../../components/FormSimpleSearch';
import useDidMountEffect from '../../../utils/DidMountEffect';
import JudulDanSumber from '../../../components/JudulDanSumber';
import TombolKembali from '../../../components/TombolKembali';

const DataStunting = () => {
	const context = useContext(Context);
	const isLoadStunting = context.isLoadStunting;
	const setIsLoadStunting = context.setIsLoadStunting;
	const dataStunting = context.dataStunting;
	const setDataStunting = context.setDataStunting;
	const getStunting = context.getStunting;
	const listTahun = context.listTahun;
	const generateYearsBetween = context.generateYearsBetween;
    const currentYear = new Date().getFullYear();
    const [search, setSearch] = useState()
    const [selectedYear, setSelectedYear] = useState(currentYear)

    useEffect(() => {
        getStunting(currentYear)
        generateYearsBetween(3)
    }, [])

    useDidMountEffect(() => {
        const searchData = async () => {
            setIsLoadStunting(true)
            try {
                const response = await axios.get(`${process.env.base_url}/data-stuntings?filters[tahun][$eq]=${selectedYear}&sort[0]=kecamatan%3Aasc&pagination[pageSize]=25&filters[$or][0][kecamatan][$containsi]=${search}&filters[$or][1][puskesmas][$containsi]=${search}&populate=*`, { headers: { Authorization: `Bearer ${process.env.base_token}` } });
                
                if (response) {
                    setIsLoadStunting(false)
                    setDataStunting(response.data.data)
                }
            } catch (err) {
                console.log(err)
            }
        }
        if (!search) {
            getStunting(selectedYear)
        } else {
            searchData()
        }
    }, [search])

	return (
		<Container fixed>
            <div className='halaman_data template_menu'>
                <TombolKembali link='/stunting' />
                <div className='box_data'>
                    <JudulDanSumber judul='Data Stunting Kota Palembang' sumber='Dinas Kesehatan Kota Palembang' />
                    <FormSimpleSearch placeholder='Cari kecamatan/ puskesmas' action={(e) => setSearch(e.target.value)} id='Search' />
                    <div className='flex_filter'>
                        <h6 className='h6_small'>Filter Tahun</h6>
                        <div className='flex_menu_filter'>
                            {listTahun.map((dt, i) => (
                                <button type='button' onClick={() => {setSelectedYear(dt); getStunting(dt)}} className={'p_small btn_menu_filter ' + (selectedYear === dt ? 'active' : 'inactive')} key={i}>{dt}</button>
                            ))}
                        </div>
                    </div>
                    <div className='overflow_x_auto'>
                        <table className="table_decorative">
                            <thead>
                                <tr>
                                    <th>Kecamatan</th>
                                    <th>Puskesmas</th>
                                    <th>Jan</th>
                                    <th>Feb</th>
                                    <th>Mar</th>
                                    <th>Apr</th>
                                    <th>Mei</th>
                                    <th>Jun</th>
                                    <th>Jul</th>
                                    <th>Agu</th>
                                    <th>Sep</th>
                                    <th>Okt</th>
                                    <th>Nov</th>
                                    <th>Des</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(isLoadStunting) ? (
                                    <tr>
                                        <td colSpan={14} style={{padding: '50px', textAlign: 'center'}}>Loading..</td>
                                    </tr>
                                ) : (
                                    (dataStunting.length < 1) ? (
                                        <tr>
                                            <td colSpan={14} style={{padding: '50px', textAlign: 'center'}}>Maaf, data tidak tersedia.</td>
                                        </tr>
                                    ) : (
                                        dataStunting.map((dt, i) => (
                                            <tr key={i}>
                                                <td className='no_wrap'>{dt.attributes.kecamatan}</td>
                                                <td className='no_wrap'>{dt.attributes.puskesmas}</td>
                                                <td>{dt.attributes.jumlah_balita_stunting.jan}</td>
                                                <td>{dt.attributes.jumlah_balita_stunting.feb}</td>
                                                <td>{dt.attributes.jumlah_balita_stunting.mar}</td>
                                                <td>{dt.attributes.jumlah_balita_stunting.april}</td>
                                                <td>{dt.attributes.jumlah_balita_stunting.mei}</td>
                                                <td>{dt.attributes.jumlah_balita_stunting.juni}</td>
                                                <td>{dt.attributes.jumlah_balita_stunting.juli}</td>
                                                <td>{dt.attributes.jumlah_balita_stunting.agt}</td>
                                                <td>{dt.attributes.jumlah_balita_stunting.sept}</td>
                                                <td>{dt.attributes.jumlah_balita_stunting.okt}</td>
                                                <td>{dt.attributes.jumlah_balita_stunting.nov}</td>
                                                <td>{dt.attributes.jumlah_balita_stunting.des}</td>
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

export default DataStunting