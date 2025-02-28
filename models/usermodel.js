import mongoose, { Types } from "mongoose";

const { Schema } = mongoose
const userschema = new Schema({

  fullname: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
  },
  // phoneNumber: {
    //   unique: true,
  //   type: Number,
  //   required: true,
  // },
  address: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: {
    type: String,
    default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAADx8fEJCQn39/fw8PD8/PzZ2dn09PTi4uKWlpZwcHDQ0NB9fX1jY2Ps7OxJSUm3t7cqKiqlpaVoaGiFhYW/v79DQ0MXFxd5eXktLS1dXV0lJSXIyMigoKA4ODgdHR1VVVWPj4+tra1PT0+Tk5Na8LRmAAAEkElEQVR4nO3d63aqMBAFYCPIpaiI1vut2vb9X/GUti57LJjLkExi9/e/a2UvQJLJkPZ6AAAAAAAAAAAAAAAAAAAAAAAAAH9VEmf9LE64h2FHklaj8XK6ilbT5XhUpY8Wc1HsxP92xYJ7UN0pz6LZueQeWifKdUu+2voBMj7dyVd74h4gUbqRBBRik3IPkmImzVc7cA/TWFIoBRSiCPTVkbwpBhTiLciI8VE5oBDHmHu4+uKJRkAhluFF3GoFFGLLPWBdI82AQsy5h6yn0g4oRMU9aB25QUAhQprB6T6EXwJ6FE3u0Vow92liGFCIUF78suVEu0AWGrFxQCHCeO8fCAmDWGYkU0LCaQhP4oIQUIgQylPPpIQF9/DlMlJAITLuAFK0mzSE21R/UfG/EXcAKWJAEXEHkBlQE4oBdwQJ6mPo/4OoViG9Z8YdQYL2Nqz5/kZckhMuuSNIUCalX6bcESReyAlfuCPcF0fkhCu/14h9esLI75lpFwn73CHuyjpI6Pdd+vi/NL3bphJ9O+4IEjqbhs2O3BEkxuSEY+4IEubV4Avfq8KmWxZXvm9emO2r/ZRzR5AhJ+QOIEVdID5zB5B6JSZ85Q4gVRITBrDVfSIFPHEPXwHtNvX/Ju31BpTlReR7tfQTpa4fRtsQ5aUfwO9MTbWt9Dffa6UX5i+MQC6h+QLD92XFVSLvX29yDKFN4dveKOGQe9g62r6SuefMPWg96l3sF2/cQ9aU6Rbddn6Xuhvovve9X9r/phcxwIB6EYMM+DG3Ud0unQYzl7mVqNWHx57vxdyl0prhe/OFRC5r298G+gj+sL/3Zlz53h+kZtH2kdfyMfLV0vnvXbfjPOjPY39J8tn62k20XM/ygJZK6pI4T4dp/qjHRgCAU3m1MKjOl2Uo89P8syKsWxncf0wLNk8hLPSHl4noRqd0Vn6vQla+Z0wWPyulJ9VJy2D+46/WHk91ssPtkvdZZbT5/OavTnvrQzUyOK8aJteTSjKB2Tetko8ebpT2by/EVdF+SYbztu3UlWfr4oGkxr2dpf2ba9lPZ5LGlJk/L49Yaa9pWYwO1X6YDvfVYVSonAuye/Vkiv5K75pts/GhyW1oL1/tyP3uKM13tFWtWdszqC1eSiK+W7U8uQj4Ycv0gQK9WVYdR1EuoX7wq8d9K9FA76ArujfHd2pK/zZGV+S0/D90nq/msFfDrJmEztmqiucK1hxdRfoHB+acPIvafSRd2rlYUdG/R6dw8LGCy5lME+uTVOrxM3S2y43t5RhXLM/f+C+h7YtI/7yQzu6JZ2bNv93a2AyYcqf7ZLN0Qz99pgs2i8X2604qbH6Vod/bbIPFfumYfvpMF6b2JqdZ0+6Seyt7b8QOTi7pgsXTT5DQESREQiTkZzFhZnc3VJXNT6Rcb1Y0m9gL+Adm3tyFti82y22k8xK6YvfcBf5Sm+1iG+W/AnTFcmGffk4wlfUt/XfmgO+2A3JHdBCQ90Z11HUSt3aF2hXN3fVjDqpisotc2k2KynWDW9Z3yfMWfgAAAAAAAAAAAAAAAAAAAAAAAABF/wCB50Scz71fkQAAAABJRU5ErkJggg=="
  },
  favourites: [{

    type: mongoose.Types.ObjectId,
    ref: "books"

  }],
  cart: [{
    type: mongoose.Types.ObjectId,
    ref: "books"

  }],
  orders: [{
    type: mongoose.Types.ObjectId,
    ref: "orders"

  }]
}, {timestamps : true})


const userModel = mongoose.model("Users", userschema)

export default userModel

