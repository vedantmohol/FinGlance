import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJUAAACUCAMAAACtIJvYAAAAMFBMVEXk5ueutLenrrHn6eqrsbTq7O26v8LJzc/Gysza3d7h4+Sxt7rW2du2u77d4OHP0tSSCQHEAAADg0lEQVR4nO2byZLrIAwAwaxm8///7YCdmayOkWJB6j36kENOXUKITWZsMBgMBoPBYDAYDAaDweDbEIXeEleyi5vDYqy1S0iOfYOaELPVXk6yME0yauNUZzHhDJeS3yGnuLiOXoJZ/qC0MXnTK8cEM9NLpzVgPHTREi7uOq1etofU8tZpDVdqHS5hjqQKjUdR2BopPjXVqotUGcWGWpWRWqM1t9ISYaqV4ty7Rlap3imPoW8TLPW+Tj1pmRZaYgGM38rcwMp5oJSMilwKMP9+aVC1BHT8MppcqrZ+3iIDtVaES3GpiTMrIEKVM4tWSsFzfQ3WQprvCiWV853UKiFmYCEmQqnjDegOkrK+C42TyolFaMXQVpYwsRKmWq1QVqwEXZn/8IRWM1aKc0or5BTMiUWYV/+a1fSVVpSxAp1u7vnvKoPDVlHSfR9+HaQ8FCIOOBsT5c5d4DbIOa0o91eMYXd9pHcgCjcJSTcyyONgucWilELXUeqbBkxtIL8sQs1C4hmYUYhQ0eb6CjxYxOf5Deha2CJUTDhgJY30Tgy8GLa6cRcaoCUN/a3ohXorSX77eKW6wrd6A9ioLA+Svn7eIkKdVOs2gvT6HfxOSnd4qtcHdatJ9XxCLO/CJXmzl8EHLacfOyyuTqaL0uaV9FPrBy//2J7NH3ljk8x9wOQkddeGlA3B3KLLIcOXn2jDd3QVZTGlWJozTvRuJ9r47QRzF+7+7CKklJtLM5iOZfDkml4+am3NElKHqJX2tLBlk5RP/VfbP9EE5xoGTbFgtN/vcvqbjTn3F9die1WC9KpG7VZ4HpdEPCmFCpZDL0BKAWN0ERPO+OooPURMEwVMpZ0mvjoxqQn6B/KKhwrTrZgP58Zrt9kR6KXn8/JLMPNpnK5eZy3caoY1Eb3X4ssZ4cqDd57T6hU/36SKdGKgLlr80+4G9KP8e6/PDtToW/8jrY/uaSDXHEDQfbegu5dmWp5SikvUVKSNVAERLXqprAWWIpp9d0BnIrwpFIOEtWWJD5o8QFqwKn/6MrOnBZiIyPc2jFWst8I3U8C1qm+UWhSFK7VSc4v594u0dbtAhW1aQFL1UF53aX0elZnVoqrf4qus2jpVtr9DPiA5hZp1p3Wu87qPY9AtoXiOW3tmdOMXmuN2B5qj1oHV4ZeG7RbmG453f62r1cqhlZ46cGg1GAwGg8Fg8IIf2AYpSbp2A2QAAAAASUVORK5CYII=",
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;