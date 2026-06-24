import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }

  body{
    font-family: Arial, Helvetica, sans-serif;
    background:#FFF8F2;
  }

  img{
    display:block;
    max-width:100%;
  }

  button{
    cursor:pointer;
    border:none;
    background:none;
  }

  ul{
    list-style:none;
  }

  a{
    text-decoration:none;
    color:inherit;
  }
`

export default GlobalStyles