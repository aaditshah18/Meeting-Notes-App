import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchParticularNote, createNewNote, updateExistingNote, deleteNote} from '../../api/notes';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Box, Button, Checkbox, TextField } from '@mui/material';
import MainTitle from "../../components/MainTitle"

const ActionItemsInput = ({control}: {control: any}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "actionItems",
  })

  return (
    <Box>
      {fields.map((field, index) => (
        <Box key={field.id} marginBottom={2}>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" flexGrow={1}>
              <div>
                <Controller
                  render={({ field }) => (
                    <Checkbox 
                      {...field}
                      checked={!!field.value}
                    />
                  )}
                  name={`actionItems.${index}.completed`}
                  control={control}
                />
              </div>
              <Box flexGrow={1}>
                <Controller
                  render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        placeholder='Add action item here'
                      />
                  )}
                  rules={{ required: true }}
                  name={`actionItems.${index}.text`}
                  control={control}
                />
              </Box>
            </Box>
            <Box marginLeft={2} display="flex" justifyContent="center">
              <Button onClick={() => remove(index)} variant="outlined" color="error">
                  Remove
              </Button>
            </Box>
          </Box>
        </Box>
      ))}
      <Button
        onClick={() => append({
          text: "",
          completed: false,
        })}
      >
        Add Item
      </Button>
    </Box>
  )
}

export default function NoteForm() {
  const { id } = useParams(); // Get the id from the URL
  const { register, handleSubmit, setValue, formState: { errors }, control } = useForm<any>({
    defaultValues: {
      title: "",
      content: "",
      actionItems: [{
        completed: false,
        text: "",
      }]
    }
  });
  const [loading, setLoading] = useState<boolean>(true); // State to track loading status
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const { result, data } = await fetchParticularNote(id); // Call the API with the id
          if (result && data) {
            setValue('title', data.title);
            setValue('content', data.content);
            setValue('actionItems', data.actionItems);
            // Update formData state with the fetched data
          }
        }
      } catch (error) {
        console.error('Error fetching note data:', error);
      } finally {
        setLoading(false); // Set loading state to false after fetching data
      }
    };

    fetchData(); // Call the fetchData function when id changes

  }, [id]);

  const onSubmit = (formData: any) => {
    formData.creationDate = Date.now();
    if (id) {
      console.log('Editing existing item:', formData);
      updateExistingNote(formData, id);
    } else {
      console.log('Calling the Create API', formData);
      createNewNote(formData);
    }
    window.location.href = '/';
  };

  const onDelete = () => {
    if (id) {
      console.log('Deleting Note');
      deleteNote(id);
    } else {
      console.log('Cannot Delete New Note');
    }
    window.location.href = '/';
  };

  return (
    <Box height="100vh">
      <MainTitle/>
      <Box paddingX={12}>
        <h1>{id ? "Edit Note" : "Add Note"}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box marginBottom={4}>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title ? 'Title is required' : ''}
                />
              )}
            />
          </Box>
          <Box marginBottom={4}>
            <Controller
              name="content"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Content"
                  multiline
                  rows={4}
                  fullWidth
                  error={!!errors.content}
                  helperText={errors.content ? 'Content is required' : ''}
                />
              )}
            />
          </Box>
          <ActionItemsInput control={control} />
          <Box display="flex" justifyContent="end" gap={1}>
            <Button type="submit" variant="contained">Submit</Button>
            <Button type="submit" variant="contained" color='error' onClick={onDelete}>Delete Note</Button>            
          </Box>
        </form>
      </Box>
    </Box>
  );
};