import DataGrafik from '../../components/DataGrafik';

const Inflasi = () => {
	const menu = [
		{
			img: '/assets/images/Data.png',
			title: 'Data',
			link: '/inflasi/data-inflasi'
		},
		// {
		// 	img: '/assets/images/Laporan.png',
		// 	title: 'Laporan',
		// 	link: '/inflasi/laporan'
		// },
		{
			img: '/assets/images/Grafik.png',
			title: 'Grafik',
			link: '/inflasi/grafik-inflasi'
		}
	]

	return (
		<DataGrafik judul='Inflasi' menu={menu} />
	)
}

export default Inflasi