import { Container } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import TombolKembali from './TombolKembali';

const DataGrafik = ({judul, menu}) => {

	return (
		<Container fixed>
			<div className='halaman_kedua template_menu'>
				<TombolKembali link='/' />
				<div className='flex_title mb_50'>
					<Image src='/assets/images/Logo Palembang.png' width={48} height={48} alt='Logo' />
					<h4 className='h4'>{judul}</h4>
				</div>
				<div className='grid_two_cards'>
					{menu.map((dt, i) => (
						<Link href={dt.link} key={i}>
							<div className='menu_card_secondary'>
								<Image src={dt.img} width={80} height={80} className='img_' alt='Menu' />
								<h6 className='h6_normal title_'>{dt.title}</h6>
							</div>
						</Link>
					))}
				</div>
			</div>
		</Container>
	)
}

export default DataGrafik