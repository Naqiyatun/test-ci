import { Container } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Home = () => {
	const menu = [
		{
			img: '/assets/images/Logo 1.jpg',
			title: 'Kemiskinan',
			link: '/kemiskinan'
		},
		{
			img: '/assets/images/Logo 2.jpg',
			title: 'Inflasi',
			link: '/inflasi'
		},
		{
			img: '/assets/images/Logo 3.jpg',
			title: 'Stunting',
			link: '/stunting'
		}
	]

	return (
		<Container fixed>
			<div className='halaman_utama template_menu'>
				<Image src='/assets/images/Logo Perintis.png' width={84} height={84} className='mb_30' alt='Logo' />
				<h1 className='h3 mb_4'><b>PERINTIS</b></h1>
				<p className='p_normal mb_50 text_center'>Perangi Stunting, Intervensi Inflasi, Sukseskan Pengentasan Kemiskinan</p>
				<div className='grid_three_cards'>
					{menu.map((dt, i) => (
						<Link href={dt.link} key={i}>
							<div className='menu_card_primary'>
								<div className='img_rlv'>
									<Image src={dt.img} fill className='img_abs' alt='Menu' />
								</div>
								<div className='flex_menu'>
									<h5 className='h5'>{dt.title}</h5>
									<Image src='/assets/icons/Icon Dot.svg' width={32} height={8} alt='Dot' />
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</Container>
	)
}

export default Home