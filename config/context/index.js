import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';

export const Context = createContext();

const ContextProvider = (props) => {
    const [listTahun, setListTahun] = useState([]) 
    function generateYearsBetween(gap) {
        let endYear = new Date().getFullYear();
        let startYear = new Date().getFullYear() - gap;
        let years = [];
      
        for (var i = endYear; i > startYear; i--) {
          years.push(endYear);
          endYear--;
        }
        setListTahun(years);
    }

    const [dataKemiskinan, setDataKemiskinan] = useState([])   
    const [isLoadKemiskinan, setIsLoadKemiskinan] = useState(true)  
    const getKemiskinan = async (tahun) => {
        setIsLoadKemiskinan(true)
        try {
            const response = await axios.get(`${process.env.base_url}/data-kemiskinans?filters[tahun][$eq]=${tahun}&sort[0]=kecamatan%3Aasc&pagination[pageSize]=300&populate=*`, { headers: { Authorization: `Bearer ${process.env.base_token}` } });
            
            if (response) {
                setIsLoadKemiskinan(false)
                setDataKemiskinan(response.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const [dataStunting, setDataStunting] = useState([])   
    const [isLoadStunting, setIsLoadStunting] = useState(true)  
    const getStunting = async (tahun) => {
        setIsLoadStunting(true)
        try {
            const response = await axios.get(`${process.env.base_url}/data-stuntings?filters[tahun][$eq]=${tahun}&sort[0]=kecamatan%3Aasc&pagination[pageSize]=300&populate=*`, { headers: { Authorization: `Bearer ${process.env.base_token}` } });
            
            if (response) {
                setIsLoadStunting(false)
                setDataStunting(response.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    
    const [dataInflasi, setDataInflasi] = useState([])   
    const [isLoadInflasi, setIsLoadInflasi] = useState(true)  
    const getInflasi = async (tahun, bulan) => {
        setIsLoadInflasi(true)
        try {
            const response = await axios.get(`${process.env.base_url}/data-inflasis?filters[tahun][$eq]=${tahun}&filters[bulan][$eq]=${bulan}&populate=*`, { headers: { Authorization: `Bearer ${process.env.base_token}` } });
            
            if (response) {
                setIsLoadInflasi(false)
                setDataInflasi(response.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Context.Provider 
            value={{
                listTahun,
                dataKemiskinan, setDataKemiskinan,
                isLoadKemiskinan, setIsLoadKemiskinan,
                dataStunting, setDataStunting,
                isLoadStunting, setIsLoadStunting,
                dataInflasi, setDataInflasi,
                isLoadInflasi, setIsLoadInflasi,
                generateYearsBetween, getKemiskinan, getStunting, getInflasi
            }}
        >
            {props.children}
        </Context.Provider>
    );
}

export default ContextProvider