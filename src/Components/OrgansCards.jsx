import { useNavigate } from 'react-router-dom';
import organsMappingPc from '../assets/mapping_pc.json';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';




import Body from '../assets/images/final_body_pc.png';

export default function OrgansCards(){
    const navigate = useNavigate();

    return (
        <div>
            <div className="cards flex flex-wrap justify-center gap-6 p-6 mx-auto max-w-7xl font-[Harmattan, sans-serif]">
                {
                    organsMappingPc.map((organ, index) => (
                        <Card key={index} sx={{ maxWidth: 345 }} className="rounded-lg shadow-lg transition-transform duration-1000 ease-in-out transform hover:scale-105 hover:shadow-2xl">
                            <CardMedia
                                component="img"
                                alt={organ.title}
                                height="140"
                                image={Body}
                                className="rounded-t-lg"
                            />
                            <CardContent>
                                <Typography sx={{
                                    fontFamily: 'Harmattan, sans-serif', fontSize: {
                                        sm: '23px !important',
                                        md: '30px !important',
                                    }
                                }} gutterBottom variant="h5" component="div" className="font-semibold text-red-700">
                                    {organ.title}
                                </Typography>
                                {/* <Typography variant="body2" className="text-gray-500">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica.
                                </Typography> */}
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => navigate(organ.route)} sx={{ fontFamily: 'Harmattan, sans-serif', fontWeight: 'bold', fontSize: '20px !important' }} size="small" className="bg-green-500 text-white hover:bg-green-600">
                                    ما تيجي نشوفه
                                </Button>
                            </CardActions>
                        </Card>
                    ))
                }
            </div>

        </div>
    );
}