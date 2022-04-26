import { NftProjectsLoader } from "./nft-projects";
import { OtherRarityTools } from "./other-rarity-tools";

export const HomePage = ()=>{

    return (
        <div
            style={{display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'center', minHeight:'calc(100vh - 100px)'}}>
            <div style={{width: '100%'}}>
            <NftProjectsLoader/>
            </div>
            <CharacterArea/>

            <OtherRarityTools/>
        </div>
    );
};


const CharacterArea = (props:{})=>{
    return (
        <>
            <div style={{display:'flex', flexDirection:'row'}}>
                <Character punkId={4856} name={'@NotChris'} link={`https://twitter.com/HemanCalvin`}/>
                <Character punkId={578} name={'@RickLove'} link={`https://twitter.com/Rick_00_Love`}/>
            </div>
        </>
    );
}

const Character = ({punkId, name, link}:{punkId:number, name:string, link?:string})=>{
    return (
        <>
            <div className={link ? 'link':''}
                style={{padding: 8}}
                onClick={(e)=>{
                    if(!link){ return; } 
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(link);
                }}>
                <div>
                    <img style={{width: 150, height:150, objectFit:'contain'}} 
                        src={`/media/punk${punkId}.png`} alt="punk"/>
                </div>
                <div>
                    {!link && name}
                    {!!link && <a href={link}>{`${name}`}</a>}
                </div>
                <div>
                    {`OneDayPunk #${punkId}`}
                </div>
            </div>
        </>
    );
}