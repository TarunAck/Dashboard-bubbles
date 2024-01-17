import { useEffect, useState, Fragment } from "react";
import BubbleChart from "./components/BubbleChart/BubbleChart";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
const App = () => {
	const [normalizedData, setNormalizedData] = useState([]);
	const [selectedData, setSelectedData] = useState(null);

	const dummyArray = [
		{
			Name: "Bored Yatch Club",
			Icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAYoWsiSny0MVSWN8Kkt7lIwtA1n1u1yvlgwLC93rvqYFwb47fG4GiGMb1Yygc6RQffec&usqp=CAU",
			MarketCapPrice: "$1163149553",
			FloorPrice: "$116338",
			TotalSupply: 9998,
			ContractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
		},
		{
			Name: "Example NFT Club",
			Icon: "https://example.com/icon.jpg",
			MarketCapPrice: "$500000000",
			FloorPrice: "$50000",
			TotalSupply: 10000,
			ContractAddress: "0x1234567890123456789012345678901234567890",
		},
		{
			Name: "Artistic NFT Collective",
			Icon: "https://artisticnft.com/icon.png",
			MarketCapPrice: "$800000000",
			FloorPrice: "$80000",
			TotalSupply: 7500,
			ContractAddress: "0x7890123456789012345678901234567890123456",
		},
		{
			Name: "Crypto Cats Crew",
			Icon: "https://cryptocatscrew.org/logo.jpg",
			MarketCapPrice: "$2000000000",
			FloorPrice: "$200000",
			TotalSupply: 15000,
			ContractAddress: "0x0987654321098765432109876543210987654321",
		},
		{
			Name: "Pixel Art NFT Gallery",
			Icon: "https://pixelartgallery.com/icon.jpg",
			MarketCapPrice: "$120000000",
			FloorPrice: "$12000",
			TotalSupply: 8000,
			ContractAddress: "0x9876543210987654321098765432109876543210",
		},
		{
			Name: "Galactic Collectibles",
			Icon: "https://galacticcollectibles.io/logo.png",
			MarketCapPrice: "$500000000",
			FloorPrice: "$50000",
			TotalSupply: 10000,
			ContractAddress: "0x8765432109876543210987654321098765432109",
		},
		{
			Name: "Digital Art Revolution",
			Icon: "https://digitalartrevolution.com/icon.png",
			MarketCapPrice: "$900000000",
			FloorPrice: "$90000",
			TotalSupply: 8500,
			ContractAddress: "0x7654321098765432109876543210987654321098",
		},
		{
			Name: "NFT Explorer Club",
			Icon: "https://nftexplorerclub.io/logo.jpg",
			MarketCapPrice: "$1500000000",
			FloorPrice: "$150000",
			TotalSupply: 12000,
			ContractAddress: "0x6543210987654321098765432109876543210987",
		},
	];
	function normalizeFloorPrice(objects) {
		const maxOriginalPrice = Math.max(
			...objects.map((obj) =>
				parseInt(obj.FloorPrice.replace("$", "").replace(",", ""))
			)
		);
		const minOriginalPrice = Math.min(
			...objects.map((obj) =>
				parseInt(obj.FloorPrice.replace("$", "").replace(",", ""))
			)
		);

		return objects.map((obj) => {
			const originalPrice = parseInt(
				obj.FloorPrice.replace("$", "").replace(",", "")
			);
			const normalizedPrice =
				((originalPrice - minOriginalPrice) /
					(maxOriginalPrice - minOriginalPrice)) *
					(150 - 80) +
				80;
			obj.NormalizedFloorPrice = Math.round(normalizedPrice); // Adding a new property
			return obj;
		});
	}

	// Normalize FloorPrice in the range [100, 1000]
	useEffect(() => {
		setNormalizedData(normalizeFloorPrice(dummyArray));
	}, []);
	const HtmlTooltip = styled(({ className, ...props }) => (
		<Tooltip {...props} classes={{ popper: className }} />
	))(({ theme }) => ({
		[`& .${tooltipClasses.tooltip}`]: {
			backgroundColor: "#f5f5f9",
			color: "rgba(0, 0, 0, 0.87)",
			maxWidth: 420,
			fontSize: theme.typography.pxToRem(12),
			border: "1px solid #dadde9",
		},
	}));

	return (
		<>
			<div className="header">
				<h1>ETH Price Bubble Chart</h1>
			</div>
			<div className="content">
				<HtmlTooltip
					title={
						selectedData && (
							<Fragment>
								<Typography color="inherit">
									Name: {selectedData?.Name}
								</Typography>
								<Typography color="inherit">
									MarketCapPrice: {selectedData?.MarketCapPrice}
								</Typography>
								<Typography color="inherit">
									FloorPrice: {selectedData?.FloorPrice}
								</Typography>
								<Typography color="inherit">
									TotalSupply: {selectedData?.TotalSupply}
								</Typography>
								<Typography color="inherit">
									ContractAddress: {selectedData?.ContractAddress}
								</Typography>
							</Fragment>
						)
					}
					followCursor
				>
					<div>
						<BubbleChart
							data={normalizedData}
							setSelectedData={setSelectedData}
						/>
					</div>
				</HtmlTooltip>
				{/* <div>
					{selectedData && (
						<div>
							<img src={selectedData.Icon} alt=""></img>
							<h2>{selectedData.Name}</h2>
							<p>Market Cap: {selectedData.MarketCapPrice}</p>
							<p>Floor Price: {selectedData.FloorPrice}</p>
							<p>Total Supply: {selectedData.TotalSupply}</p>
							<p>Contract Address: {selectedData.ContractAddress}</p>
						</div>
					)}
				</div> */}
			</div>
		</>
	);
};

export default App;
