<template>
  <div class="tinymce-editor">
    <editor
        api-key="***"
        :init="{
         height: 500,
         menubar: false,
         plugins: [
           'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount'
         ],
         toolbar:
           'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | image | help'
       }"
    />
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
export default {
  name: "addMY",
  components: {
    Editor
  },
}
</script>

<style scoped>

</style>
