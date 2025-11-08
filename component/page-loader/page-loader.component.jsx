
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const PageLoader = () => {
    return (

        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                display: 'flex',
                width: '100%',
                height: '100%',
                left: '0',
                top: '0',
                opacity: '0.5',
                background: '#f1f1f1',
                zIndex: '999',
            }}
        >
            <CircularProgress color="primary" size={60} />
        </Box >

    )
}
export default PageLoader;