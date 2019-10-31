import { useMutation } from '@apollo/react-hooks'

export default (categoryAttributes, setCategoryAttributes, query, variables) => {
  const [createCategory, { loading }] = useMutation(
     query, {
      context: {hasUpload: true},
      variables
    });


  const handleChange = ({ target }) => {
    const key = target.name
    let value = target.value
    const type = target.getAttribute('type');
    if(type === 'file') value = target.files
    setCategoryAttributes({...categoryAttributes, [key]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    createCategory()
  }

  return {handleChange, handleSubmit, loading}
}