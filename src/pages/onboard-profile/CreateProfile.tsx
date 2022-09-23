import '../signup/signup'
import './createprofile.css'
import { IoCameraOutline } from 'react-icons/io5'
import { useRef } from 'react'

export function CreateProfile() {
  const filePickerRef = useRef<any>(null)

  return (
    <div className="signup">
      <form className="form">
        <h2>Create your account</h2>

        <div
          className="form__image"
          onClick={() => filePickerRef.current.click()}
        >
          <label htmlFor="file Input">
            <IoCameraOutline
              className="form__image--svg"
              aria-label="select an image"
            />
          </label>

          <input
            id="file Input"
            type="file"
            name="file"
            ref={filePickerRef}
            // onChange={addImageToPost}
            hidden
          />
        </div>

        <div className="form__wrapper">
          <label htmlFor="Full Name">Full Name</label>
          <input type="text" name="Full Name" id="Full Name" />
        </div>

        <div className="form__wrapper ">
          <label htmlFor="Username">Pick a username</label>
          <input name="text" id="Username" />
        </div>

        <div className="form__wrapper">
          <label htmlFor="Biography">Tell us about what you do:</label>
          <textarea name="text" id="Biography" />
        </div>
        <button type="submit" className="form__button">
          Next
        </button>
      </form>
    </div>
  )
}
