<template lang="pug">
.admin
  .admin-header
    h1 ADMIN PANEL
    v-btn.logout(rounded, @click="logOut")
      v-icon(medium, color="gray darken-2")
        | mdi-power

  v-card.upload
    h2 Upload files
    form(
      enctype="multipart/form-data",
      novalidate,
      v-if="isInitial || isSaving || isSuccess"
    )
      v-select.select(
        v-model="uploadName",
        :items="uploadItems",
        label="Sacuvaj fajl(ove) u folder:",
        outlined
      )
      .dropbox
        input.input-file(
          type="file",
          multiple,
          :name="uploadName",
          :disabled="isSaving",
          @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length",
          :accept="uploadAccept"
        )
        p(v-if="isInitial")
          | Drag your file(s) here to begin
          br
          |
          | or click to browse
        p(v-if="isSaving")
          | Uploading {{ uploadValue }} %...
        p(v-if="isFailed")
          v-btn(@click="reset") check and try again
          | {{ uploadError }}
        p(v-if="isSuccess")
          | Uploaded {{ uploadValue }}%
          br
          | Click or drag file(s) to upload again
</template>

<script>
import firebase from 'firebase/app'

const Status = {
  STATUS_INITIAL: 0,
  STATUS_SAVING: 1,
  STATUS_SUCCESS: 2,
  STATUS_FAILED: 3
}

export default {
  data () {
    return {
      uploadedFiles: [],
      uploadError: '',
      currentStatus: Status.STATUS_INITIAL,
      uploadFieldName: 'photos',
      formData: new FormData(),
      uploadItems: ['Audio', 'Video', 'Image'],
      uploadName: 'Audio',
      uploadValue: 0,
      img: null
    }
  },
  computed: {
    uploadAccept: function () {
      return `${this.uploadName.toLowerCase}/*`
    },
    isInitial: function () {
      return this.currentStatus === Status.STATUS_INITIAL
    },
    isSaving: function () {
      return this.currentStatus === Status.STATUS_SAVING
    },
    isSuccess: function () {
      return this.currentStatus === Status.STATUS_SUCCESS
    },
    isFailed: function () {
      return this.currentStatus === Status.STATUS_FAILED
    }
  },
  mounted () {
    this.reset()
  },
  methods: {
    reset () {
      this.currentStatus = Status.STATUS_INITIAL
      this.uploadedFiles = []
      this.uploadError = ''
    },
    save (formData) {
      this.currentStatus = Status.STATUS_SAVING
      this.upload(formData)
    },
    upload (formData) {
      try {
        this.uploadData(formData)
      } catch (e) {
        this.uploadError = e.response
        this.currentStatus = Status.STATUS_FAILED
      } finally {
        this.currentStatus = Status.STATUS_SUCCESS
      }
    },
    uploadData (formData) {
      try {
        console.log('entries: ', typeof FormData)
        for (const entry of formData.entries()) {
          console.log('entry: ', entry)
        }
        formData.forEach((formItem, type) => {
          console.log(formItem.name, type, formData)
          const storageRef = firebase
            .storage()
            .ref(`${type.toLowerCase()}/${formItem.name}`)
            .put(formItem)

          storageRef.on(
            'state_changed',
            (snapshot) => {
              this.uploadValue =
                +((+snapshot.bytesTransferred / +snapshot.totalBytes) * 100).toFixed(0)
            },
            (error) => {
              console.log(error.message)
            },
            () => {
              this.uploadValue = 100
              storageRef.snapshot.ref.getDownloadURL().then((url) => {
                const file = {
                  name: formItem.name,
                  url
                }
                firebase.database().ref(type.toLowerCase()).push(file)
                  .catch(err => {
                    console.log(err)
                  })
              })
            }
          )
        })
      } catch (e) {
        this.uploadError = e
        this.currentStatus = Status.STATUS_FAILED
      }
    },
    filesChange (fieldName, fileList) {
      if (!fileList.length) return
      Array.from(Array(fileList.length).keys()).map((x) => {
        const file = fileList[x]
        const fileName = fileList[x].name
        this.formData.append(fieldName, file, fileName)
      })
      this.save(this.formData)
    },
    logOut () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.removeItem('nox_user')
          localStorage.removeItem('nox_jwt')
          this.$store.dispatch('setLoggedIn', false)
          this.$store.dispatch('setIsAdmin', false)
          this.$router.push('/')
        })
        .catch(function (error) {
          console.log('firebase logout error: ', error)
        })
    }
  }
}

</script>

<style lang="stylus">
.admin {
  padding: 20px;
  text-align: initial;

  &-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  h1 {
    text-align: center;
    margin-right: 20px;
  }

  .logout {
    padding: 0 !important;
  }

  .upload {
    max-width: 400px;
    padding: 20px;
    margin: 40px 20px 20px;

    h2 {
      text-transform: uppercase;
      text-align: left;
      margin-bottom: 20px;
    }

    form {
      .dropbox {
        outline: 2px dashed grey;
        outline-offset: -10px;
        background: lightcyan;
        color: dimgray;
        padding: 10px 10px;
        min-height: 200px;
        position: relative;
        cursor: pointer;
      }

      .input-file {
        opacity: 0;
        width: 100%;
        height: 200px;
        position: absolute;
        cursor: pointer;
      }

      .dropbox:hover {
        background: lightblue;
      }

      .dropbox p {
        font-size: 1.2em;
        text-align: center;
        padding: 50px 0;
      }
    }
  }
}
</style>
