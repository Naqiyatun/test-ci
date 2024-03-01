import DataGrafik from '../../components/DataGrafik';

const Kemiskinan = () => {
	const menu = [
		{
			img: '/assets/images/Data.png',
			title: 'Data',
			link: '/kemiskinan/data-kemiskinan'
		},
		// {
		// 	img: '/assets/images/Laporan.png',
		// 	title: 'Laporan',
		// 	link: '/kemiskinan/laporan'
		// },
		{
			img: '/assets/images/Grafik.png',
			title: 'Grafik',
			link: '/kemiskinan/grafik-kemiskinan'
		}
	]

	return (
		<DataGrafik judul='Kemiskinan Ekstrim' menu={menu} />
	)
}

export default Kemiskinan