

const imamge = [
    {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu3-_TbUInL975rAfMjR83kQAjePhVRRJFfw&s', name: 'Image 1'},
    {url: 'https://img.freepik.com/free-photo/close-up-portrait-attractive-young-woman-isolated_273609-36523.jpg?semt=ais_hybrid&w=740&q=80', name: 'Image 2'},
    {url: 'https://www.mamp.one/wp-content/uploads/2024/09/image-resources2.jpg', name: 'Image 3'},
    {url: 'https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=', name: 'Image 1'},
    {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiCG53BcI5XoBw4u8mw2g5NXUbu7pHuBrWQg&s', name: 'Image 4'},
    {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzY4ZhdaTaeaDiMrEl_YRU8_8txhzBh2hQcA&s', name: 'Image 5'},
    {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3c6HhVRJz4IMr8hiE7R5j6_VNzhSD4hJRtQ&s', name: 'Image 6'},
    {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&s', name: 'Image 7'},
    {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBfsQZ709qvCUs8YMr0OIXWp7qGumWlxXFAw&s', name: 'Image 8'},
    {url: 'https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/14235/production/_100058428_mediaitem100058424.jpg', name: 'Image 9'},
    {url: 'https://cdn.mos.cms.futurecdn.net/v2/t:0,l:125,cw:750,ch:563,q:80,w:750/mzvdREkye2SgLCAqAme7fY.jpg', name: 'Image 10'},
    {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjclDv0e9IVQdcKL5CgI8DITEgglEavaKqww&s', name: 'Image 11'},
]
const MediaPage = () => {
    return (
        <div className="grid grid-cols-6 gap-2 w-full">
            {imamge.map((img, index) => (
                <div key={index} className="rounded overflow-hidden group">
                    <img src={img.url} alt={img.name} className="w-full h-full object-cover"/>
                    <p className="text-center group-hover:z-100">{img.name}</p>
                </div>
            ))}
        </div>
    )
}

export default MediaPage