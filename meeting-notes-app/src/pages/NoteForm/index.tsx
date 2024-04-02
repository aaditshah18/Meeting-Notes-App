import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NoteType, fetchParticularNote, createNewNote, updateExistingNote} from '../../api/notes';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Box } from '@mui/material';

const ActionItemsInput = ({control}: {control: any}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "actionItems",
  })

  return (
    <Box>
      {fields.map((field, index) => (
        <Box key={field.id}>
          <Box display="flex">
            <div>
              <Controller
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      type="checkbox"
                      value="completed"
                      checked={!!field.value}
                    />
                  </>
                )}
                name={`actionItems.${index}.completed`}
                control={control}
              />
            </div>
            <div>
              <Controller
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      className="form-control mb-4"
                      placeholder="add your action item here"
                    />
                  </>
                )}
                rules={{ required: true }}
                name={`actionItems.${index}.text`}
                control={control}
              />
            </div>
            <div>
              <button onClick={() => remove(index)}>
                  Remove
              </button>
            </div>
          </Box>
        </Box>
      ))}
      <button onClick={() => append({
          text: "",
          completed: "completed",
        })}>
        Add Item
      </button>
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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>THIS IS NOTE PAGE</h1>
 
      <Box>
        <input
          type="text"
          placeholder="Title"
          {...register('title', { required: true })}
        />
        <div>{errors.title && <span>Title is required</span>} {/* Error message for required title */}</div>
      </Box>
      {/* TextArea */}
      <Box>
        <textarea
          placeholder="Note Content"
          {...register('content', { required: true })}
        />
        <div>{errors.content && <span>Note content is required</span>}</div>
      </Box> 
      {/* ActionItemList */}
      {/* Render action items input fields here */}
      <ActionItemsInput control={control} />

    {/*SubmitButton - This is a basic submit button to trigger handleSubmit when clicked  */}
      <button type="submit">Submit</button>
    </form>
  );
};