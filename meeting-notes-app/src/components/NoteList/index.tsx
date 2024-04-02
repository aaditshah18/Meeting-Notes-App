import { Box, ListItemButton } from "@mui/material";
import { NoteType } from "../../api/notes";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";


interface NodeListProps {
    data: NoteType[];
}

interface NoteProps {
    data: NoteType;
    divider: boolean;
}

const Note = (props: NoteProps) => {
    const n = props.data;
    const {divider = false} = props;

    return (
      <ListItem 
        alignItems="flex-start"
        divider={divider}
      >
        <ListItemButton role={undefined} dense>
          <Link to={`/note/${n.noteId}`}>
            <ListItemText
              primary={
                <Box
                  display="flex"
                  justifyContent="space-between"
                >
                  <Typography
                    color="text.primary"
                  >
                    {n.title}
                  </Typography>

                  <Typography color="GrayText">
                    {new Date(n.creationDate).toDateString()}
                  </Typography>
                </Box>
              }
              secondary={
                <>
                  <Typography
                    sx={{ display: 'block' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {n.content}
                    </Typography>
                    {n.actionItems.map(action => (
                    <Typography
                      key={action._id}
                      sx={{ display: 'block' }}
                      component="span"
                      variant="body2"
                      color={action.completed ? 'secondary' : 'text.primary'}
                    >
                      <input type="checkbox" checked={action.completed} readOnly />
                      <label>{action.text}</label>
                    </Typography>
                  ))}
                </>
              }
            />
          </Link>
        </ListItemButton>
      </ListItem>
    )
}

export default function NoteList(props: NodeListProps) {
    const {data} = props;
    return (
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {data.map((n, i) => (
          <Note key={n._id} data={n} divider={i !== data.length - 1} />
        ))}
      </List>
    );
}