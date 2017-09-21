import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { bindRoutineCreators } from 'actions'
import { fetchProfile, updateProfile } from 'actions/auth'
import { DangerAlert } from 'components/Alert'
import { EmailField, TextField } from 'components/Form'


class UserInfo extends React.Component {
  componentWillMount() {
    this.props.fetchProfile.maybeTrigger()
  }

  render() {
    const { error, handleSubmit, pristine, submitting } = this.props
    return (
      <div>
        <h2>Update Profile!</h2>
        {error && <DangerAlert>{error}</DangerAlert>}
        <form onSubmit={handleSubmit(updateProfile)}>
          <TextField name="username"
                     autoFocus
          />
          <EmailField name="email" />
          <div className="row">
            <button type="submit"
                    className="btn btn-primary"
                    disabled={pristine || submitting}
            >
              {submitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const UserInfoForm = reduxForm({
  form: 'userInfo',
})(UserInfo)

export default connect(
  (state) => ({ initialValues: state.auth.user }),
  (dispatch) => bindRoutineCreators({ fetchProfile }, dispatch),
)(UserInfoForm)