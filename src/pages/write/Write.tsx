import './write.css'
import { FaRegEye } from 'react-icons/fa'
import { HiOutlinePencil } from 'react-icons/hi'
import { IoImagesOutline } from 'react-icons/io5'

export function Write() {
  return (
    <div className="write">
      <button className="write__button">
        <IoImagesOutline /> Add Cover
      </button>

      <div className="write__wrapper">
        <label htmlFor="Article title">Article Title</label>
        <textarea name="title" id="Article title" placeholder="Article Title" />
      </div>

      <div className="write__preview">
        <button>
          <HiOutlinePencil />
          Write
        </button>
        <button>
          <FaRegEye />
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
