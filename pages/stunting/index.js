import DataGrafik from '../../components/DataGrafik';

const Stunting = () => {
	const menu = [
		{
			img: '/assets/images/Data.png',
			title: 'Data',
			link: '/stunting/data-stunting'
		},
		// {
		// 	img: '/assets/images/Laporan.png',
		// 	title: 'Laporan',
		// 	link: '/stunting/laporan'
		// },
		{
			img: '/assets/images/Grafik.png',
			title: 'Grafik',
			link: '/stunting/grafik-stunting'
		}
	]

	return (
		<DataGrafik judul='Stunting' menu={menu} />
	)
}

export default Stunting