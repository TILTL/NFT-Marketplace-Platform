import { useEffect, useState } from "react";
import { setGlobalState, useGlobalState } from "../store";

const Artworks = () => {
  const [nfts] = useGlobalState("nfts");
  const [end, setEnd] = useState(4);
  const [count] = useState(4);
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [collection, setCollection] = useState([]);

  const myArtworks = collection.filter((nft) => nft.owner === connectedAccount);
  const latestArtworks = collection
    .filter((nft) => nft.owner !== connectedAccount)
    .slice(0, end);

  const getCollection = () => {
    return nfts;
  };

  useEffect(() => {
    setCollection(getCollection());
  }, [nfts, end]);

  return (
    <div className="bg-[#151c25] gradient-bg-artworks">
      <div className="w-4/5 py-10 mx-auto">
        <h4 className="text-white text-3xl font-bold uppercase text-gradient">
          {myArtworks.length > 0 ? "My Artworks" : "No Artworks Owned"}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5">
          {myArtworks.map((nft, i) => (
            <Card key={i} nft={nft} />
          ))}
        </div>
        <br />
        <h4 className="text-white text-3xl font-bold uppercase text-gradient">
          {latestArtworks.length > 0 ? "Latest Artworks" : "No Artworks Yet"}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5">
          {latestArtworks.map((nft, i) => (
            <Card key={i} nft={nft} />
          ))}
        </div>

        {latestArtworks.length <
        nfts.filter((nft) => nft.owner !== connectedAccount).length ? (
          <div className="text-center my-5">
            <button
              className="shadow-xl shadow-black text-white
              bg-[#39afcd] hover:bg-[#08405f]
              rounded-full cursor-pointer p-2"
              onClick={() => setEnd(end + count)}
            >
              Load More
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const Card = ({ nft }) => {
  const setNFT = () => {
    setGlobalState("nft", nft);
    setGlobalState("showModal", "scale-100");
  };

  return (
    <div className="w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
      <img
        src={nft.metadataURI}
        alt={nft.title}
        className="h-60 w-full object-cover shadow-lg shadow-black rounded-lg mb-3"
      />
      <h4 className="text-white font-semibold">{nft.title}</h4>
      <p className="text-gray-400 text-xs my-1">{nft.description}</p>
      <div className="flex justify-between items-center mt-3 text-white">
        <div className="flex flex-col">
          <small className="text-xs">Current Price</small>
          <p className="text-sm font-semibold">{nft.cost} ETH</p>
        </div>

        <button
          className="shadow-lg shadow-black text-white text-sm bg-[#39afcd]
          hover:bg-[#08405f] cursor-pointer rounded-full px-1.5 py-1"
          onClick={setNFT}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Artworks;
