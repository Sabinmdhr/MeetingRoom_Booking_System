import { Box, Card, Typography, TextField, Button} from "@mui/material"
import "../assets/scss/pages/CreatePassword.scss"

const CreatePassword = () => {
  return (
    <Box className="create-password">
        <Card className='create-card' elevation={3}>
            <div className="create-grid">
                <div className="create-left">
                    <Typography className="create-title" variant='h6'>
                        Create New Password
                    </Typography>
                    <Typography className="create-subtitle" variant='body2'>
                        Your new password should be different from previous password.
                    </Typography>
                </div>
                <form className="create-right">
                    <Typography className="create-input" variant='body2'>
                        Password
                    </Typography>
                    <TextField className="create-field" 
                        variant='outlined'
                        size='small'
                        fullWidth
                    />
                    <Typography className="create-input" variant='body2'>
                        Confirm Password
                    </Typography>
                    <TextField className="create-field" 
                        variant='outlined'
                        size='small'
                        fullWidth
                    />
                    <Button className="confirm-btn"
                    type='submit'
                    variant='contained'
                    fullWidth
                    >
                        Confirm
                    </Button>
                </form>
            </div>
        </Card>
    </Box>
  )
}

export default CreatePassword
