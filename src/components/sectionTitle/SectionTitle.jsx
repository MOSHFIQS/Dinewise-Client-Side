

const SectionTitle = ({Heading,subHeading}) => {
    return (
        <div className='text-center w-full flex items-center justify-center flex-col pb-12'>
            <h5 className='text-center text-xl text-yellow-500'>{subHeading}</h5>
            <hr className='w-80 border-2 border-gray-300' />
            <h1 className='text-3xl uppercase font-extrabold py-3'>{Heading}</h1>
            <hr className='w-80 border-2 border-gray-300' />
        </div>
    );
};

export default SectionTitle;