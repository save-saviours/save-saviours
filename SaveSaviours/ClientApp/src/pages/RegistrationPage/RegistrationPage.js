import React, { useState } from 'react'
import { Grid, Divider } from '@material-ui/core'
import styles from 'styles/styles'
import { isValidEmail, isValidPhoneNumber, isValidZip } from 'services'
import RegistrationTextField from 'components/Registration/RegistrationTextField'
import RegistrationCallToAction from 'components/Registration/RegistrationCallToAction'
import RegistrationExperience from 'components/Registration/RegistrationExperience'
import RegistrationOptIn from 'components/Registration/RegistrationOptIn'
import RegistrationButton from 'components/Registration/RegistrationButton'
import * as messages from 'messages/de.json'

const RegistrationPage = () => {
  const classes = styles()
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [zip, setZip] = React.useState('')
  const [datasecurity, setDatasecurity] = useState(false)
  const [checked, setChecked] = React.useState([])
  const [tags, setTags] = useState([
    messages['registrationpage.select'][0].text,
    messages['registrationpage.select'][1].text,
    messages['registrationpage.select'][2].text,
    messages['registrationpage.select'][3].text,
    messages['registrationpage.select'][4].text,
    messages['registrationpage.select'][5].text,
    messages['registrationpage.select'][6].text,
    messages['registrationpage.select'][7].text,
    messages['registrationpage.select'][8].text,
    messages['registrationpage.select'][9].text,
  ])
  const [error, setError] = React.useState({
    name: false,
    email: false,
    phone: false,
    zip: false,
  })
  const isValidForm = () => {
    setError({
      ...error, phone: false, zip: false,
    })
    if (!isValidEmail(email)) {
      setError({ ...error, email: true })
      return false
    }
    if (!isValidPhoneNumber(phone)) {
      setError({ ...phone, phone: true })
      return false
    }
    if (!isValidZip(zip)) {
      setError({ ...error, zip: true })
      return false
    }
    return true
  }
  const handleRegistration = (event) => {
    event.preventDefault()
    const payload = {
      name,
      email,
      phone,
      zip,
      experience: checked,
    }
    if (isValidForm(payload)) {
      // send validated payload to backend
      window.location = '/confirmation'
    }
  }
  return (
    <Grid container>
      <Grid item className={classes.registrationGrid}>
        <RegistrationCallToAction messageAction={messages['registrationpage.callToAction']} />
        <form onSubmit={(event) => handleRegistration(event)}>
          <RegistrationTextField
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            zip={zip}
            setZip={setZip}
            error={error}
          />
          <RegistrationExperience
            setChecked={setChecked}
            tags={tags}
            messageSubtitle={messages['registrationpage.helper.subtitle']}
          />
          <Divider className={classes.registrationDivider} />
          <RegistrationOptIn datasecurity={datasecurity} setDatasecurity={setDatasecurity} />
          <RegistrationButton
            handleRegistration={handleRegistration}
            messageRegistrationButton={messages['registrationpage.helper.registrationButton']}
          />
        </form>
      </Grid>
    </Grid>
  )
}

export default RegistrationPage
