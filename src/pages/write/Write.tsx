import './write.css'
import { FaRegEye } from 'react-icons/fa'
import { HiOutlinePencil } from 'react-icons/hi'
import { IoImageOutline } from 'react-icons/io5'

export function Write() {
  return (
    <div className="write">
      <button className="write__button">
        <IoImageOutline className="write__button--icon" /> Add Cover
      </button>
      {/* <div className="write__cover">
        <img src="https://images2.alphacoders.com/100/1007550.jpg" alt="" />
      </div> */}
      <div className="write__wrapper">
        <label htmlFor="Article title">Article Title</label>
        <textarea
          name="title"
          id="Article title"
          placeholder="Article title..."
        />
      </div>

      <div className="write__buttons">
        <button>
          <HiOutlinePencil className="icon" />
          Write
        </button>
        <button>
          <FaRegEye className="icon" />
          Preview
        </button>
      </div>

      <div className="write__container">
        <div className="write__container--wrapper">
          <label htmlFor="Article text">Article text</label>
          <textarea
            name="text"
            id="Article text"
            placeholder="Tell yout story..."
          />
        </div>
        {/* <div className="write__container--preview">

        </div> */}
      </div>
    </div>
  )
}
