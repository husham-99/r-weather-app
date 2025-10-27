import React, { useEffect, useState } from "react";
import './Card.css'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import axios from 'axios';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import 'moment/min/locales';




export default function Card() {

    const { t, i18n } = useTranslation();
    const [locale, setLocale] = useState('ar')

    const handleLangClick = () => {
        if (locale === 'en') {
            setLocale('ar')
            i18n.changeLanguage('ar')

        } else {
            setLocale('en')
            i18n.changeLanguage('en')


        }
    };


    useEffect(() => {
        i18n.changeLanguage(locale)
        moment.locale(locale);
    }, [locale])



    const [dateAndTime, SetdateAndTime] = useState('')
    const [temp, setTemp] = useState({
        number: null,
        description: '',
        max: null,
        min: null,
        icon: null,
        feel: null,
        humidity: null
    })
    useEffect(() => {

        SetdateAndTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
        axios.get('https://api.openweathermap.org/data/2.5/weather?lat=24.7&lon=46.7&appid=84615bdef0b6e0a09c9c3cbfbab4d0c7')

            .then(function (response) {
                // handle success

                const temp = Math.round(response.data.main.temp - 273.15)
                const description = response.data.weather[0].description
                const max = Math.round(response.data.main.temp_max - 273.15)
                const min = Math.round(response.data.main.temp_min - 273.15)
                const responseIcon = response.data.weather[0].icon
                const feel = Math.round(response.data.main.feels_like - 273.15)
                const humidity = response.data.main.humidity

                setTemp({ number: temp, description: description, humidity: humidity, max: max, min: min, feel: feel, icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png` })


            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    }, [])

    return (

        <Container maxWidth="sm">

            {/*content container*/}
            <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ width: '100%' }}>
                    {/*content*/}
                    <div style={{
                        color: '#fff',
                        padding: '20px 20px 45px 20px', borderRadius: '10px', background: '#0000006c'
                    }}>
                        {/*city and time*/}
                        <div dir={locale === 'ar' ? 'rtl' : 'ltr'} style={{
                            display: 'flex',
                            justifyContent: 'start',
                            alignItems: 'end', gap: '30px', padding: "20PX 0"
                        }}>

                            <Typography className="title" variant="h2" style={{ fontFamily: 'Cairo' }}>
                                {t("Ryiadh")}
                            </Typography>

                            <Typography className="date" variant="h6">
                                {dateAndTime}
                            </Typography>
                        </div>
                        {/*==city and time*/}
                        <hr />
                        {/*degree and desc*/}
                        <div className="main" dir={locale === 'ar' ? 'rtl' : 'ltr'} style={{ display: 'flex', gap: '70px', alignItems: 'center' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography className="main-temp" variant="h2" style={{ textAlign: 'right' }}>
                                        {temp.number + 'c'}
                                    </Typography>
                                    <Typography variant="h6" style={{ textAlign: 'right' }}>
                                        <img src={temp.icon} alt={temp.description} />
                                    </Typography>
                                </div>
                                <Typography className="info" variant="h6" style={{ textAlign: 'start', fontFamily: 'Cairo' }}>
                                    {t(temp.description)}
                                </Typography>
                                <Typography className="info" variant="h6" style={{ textAlign: 'start', fontFamily: 'Cairo' }} >
                                    {t("Feels like")} : {temp.feel}
                                </Typography>
                                <Typography className="info" variant="h6" style={{ textAlign: 'start', fontFamily: 'Cairo' }}>
                                    {t("Humidity")} : {temp.humidity}
                                </Typography>
                                <div style={{ textAlign: 'right', display: 'flex', gap: '10px', alignItems: 'center', marginTop: '8px' }}>
                                    <Typography className="info" variant="h6" style={{ textAlign: 'start', fontFamily: 'Cairo' }}>
                                        {t('Min')}: {temp.min}
                                    </Typography>
                                    <h5 style={{ margin: '0 10px' }} >|</h5>
                                    <Typography className="info" variant="h6" style={{ textAlign: 'start', fontFamily: 'Cairo' }}>
                                        {t('Max')}: {temp.max}
                                    </Typography>



                                </div>
                            </div>
                            <div>
                                <CloudIcon className="icon" style={{ fontSize: '180px' }} />
                            </div>
                        </div>
                        {/*==degree and desc*/}
                    </div>
                    {/*==content*/}
                </div>
                <button onClick={handleLangClick} style={{
                    alignSelf: 'flex-start', width: '100px', height: '35px', fontFamily: 'Cairo',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', background: '#0000006c',
                    color: '#fff', cursor: 'pointer', marginTop: '20px', borderRadius: '5px'
                }}>{locale === 'ar' ? 'English' : 'Arabic'}</button>
            </div>
            {/*==content container*/}
        </Container >

    )
}