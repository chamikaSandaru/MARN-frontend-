import { Button,  Grid2,  Typography } from "@mui/material";
import { useEffect, useState } from "react";

const UserButton = ({addUser,UpdateUser, submitted,data,isEdit}) => {

    const [id,setid] = useState(0);
    const [name,setName] = useState('');

    useEffect(() => {
        if(!submitted){
            setid(0);
            setName('');
        }
    },[submitted]
    );

    useEffect(()=> {
        if(data?.id && data.id !==0){
            setid(data.id);
            setName(data.name);
        }
    },[data])

    return(
        <Grid2 container
        spacing={2}
        sx={{
            backgroundColor: '#ffffff',
            marginBottom: '10px',
            display:'block',
        }}>
              <Grid2 item xs={12}>
                <Typography component={'h1'} sx={{color: '#000000', fontSize: '20px', fontWeight: 'bold', marginTop: '10px'}}>
                    User Form 
                </Typography>
                </Grid2>  
                <Grid2 item xs={12} sm={6} sx={{display:'flex'}}>
                    <Typography
                        component={'label'}
                        htmlFor="id"
                        sx={{color: '#000000', 
                        fontSize: '16px', 
                        fontWeight: 'bold', 
                        textAlign: 'left', 
                        marginTop: '10px', 
                        marginLeft: '10px',
                        width: '100px',
                        display: 'block'
                    }}
                    >
                        ID
                    </Typography>
                    <input
                        type="number"
                        id="id"
                        name="id"
                        placeholder="Enter ID"
                        value={id}
                        onChange={e => setid(e.target.value)}
                        sx={{color: '#000000', fontSize: '16px', fontWeight: 'bold', textAlign: 'left', marginTop: '10px', marginLeft: '10px'}}
                    />
                </Grid2>
                <Grid2 item xs={12} sm={6} sx={{display:'flex'}}>
                    <Typography
                        component={'label'}
                        htmlFor="id"
                        sx={{color: '#000000', 
                        fontSize: '16px', 
                        fontWeight: 'bold', 
                        textAlign: 'left', 
                        marginTop: '10px', 
                        marginLeft: '10px',
                        width: '100px',
                        display: 'block',
                       
                    }}
                    >
                        Name
                    </Typography>
                    <input
                        type="text"
                        id="Name"
                        name="Name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        sx={{color: '#000000', fontSize: '16px', fontWeight: 'bold', textAlign: 'left', marginTop: '10px', marginLeft: '10px'}}
                    />
                </Grid2>
                <Button sx={{margin:"auto",
                marginBottom:"20px",
            backgroundColor:"#ffffff",
            color: "#000000",
            marginLeft:"15px",
            marginTop:"20px",
            "&:hover": {
                opacity:"0.7",
                backgroundColor:"#00c6e6",
            }
            }}
            onClick={() => isEdit ? UpdateUser({id,name}): addUser({id,name})}
            >
            {
                isEdit? "Update" :"Add"
            }
            </Button>
        </Grid2>
        
    )
        
    
}

export default UserButton;