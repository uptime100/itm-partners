import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  .modal-content{
    background-color:white !important;
    padding:50px 40px;
    border-radius: 2px;
    width: 30% !important;
  }

  .modal-content.disclaimerModalContent{
    width: 35% !important;
  }


  .modal.is-active {
    z-index: 100;
  }

  .actionPanel{
    margin-bottom: 3.5rem;
  }

  figure.image {
    padding: 13px;
  } 

  .detailsMobile{
    display: none;
  }

  .detailsMobilePlugins{
    display: none;
  }

  .column.resultMobile {
    display: none;
  }

  #companyAlign{
    margin-top:45px;
    margin-bottom:100px;
    background-color:white;
    padding-top:20px;
    padding-left: 20px;
    padding-right:20px;
    text-align:center;
  }

  .selectWidth{
    width: 200px;
  }

  nav.navbar.is-fixed-top {
    z-index: 100;
  }

  .columns.boxSize.box {
    margin-bottom: 24px;
    padding-bottom:0px;
    background-color:#F0F0F0;
  }

  .columns.rowDetails {
    border-bottom: 1px solid #F0F0F0;
    margin-top: 18px;
  }


  .column.transactSearch {
    padding: 35px 12px 12px 12px;
  }


  .refineButton{
    position: relative;
    top: 25px;
  }

  .columns.accountOverviewDetails{
    background-color:#62b5e5;
    margin-top: 10px
    color:white;
    font-weight:700;
    padding:15px 5px;
  
  }

  .columns.accountOverviewDetailsRow{
    background-color:#FFF;
  }

  .columns.accountOverviewDetailsRow:nth-child(odd) {
    background-color:#EFF7FC;
  }

  .columns.TransactionsDetailsRow{
    background-color:#EFF7FC;
  }

  .resetKey{
    margin-top: 24px;
  }

  .navbar{
    z-index:999
  }

  .amountPlaceholder::placeholder {
    color:#62B5E5 !important;
    opacity:1;
  }

  .dropdown-width{
    width: 93px;
  }

 
  .arrowImgIn{
    width:20px;
    position:relative;
    bottom: 2px;
  }

  .arrowImgOut{
    width:18.5px;
    position:relative;
    bottom: 2px;
  }

  .content table{
    border: 1px solid #62B5E5;
    font-family: 'SF Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
    thead{
        background-color: #62B5E5;
        font-weight: 900;
        tr{
            th{
                border:none;
                height:70px;
                vertical-align: inherit;
                color: white;
            }
        }
    }
    tbody{
        tr{
            &:nth-child(odd){
                background-color: rgba(98, 181, 229, 0.1);
                }
            }
            th{
                border: none;
                height:50px;
                vertical-align: inherit;
            }
            td{
                border: none;
                height:50px;
                vertical-align: inherit;
            }
        }

}

  .content h1{
    color: #62B5E5 !important;
  }




  @media(min-width: 769px) {
    #app {
      padding-top: 55px;
    }

    .mobileRes{
      display:block;
    }

  }

  .reverseArrow {
    position: relative;
    transform: rotate(180deg);
    display: inline-block;
    bottom:2px;
    right:5px;
  }

  .outArrow {
    position: relative;
    display: inline-block;
    bottom:2px;
    right:5px;
  }

  .exportTransactData{
    position:relative;
    top:5px;
  }

  @media(min-width: 1216px) {
    #app {
      padding-top: 110px;
    }
  }

  @media screen and (max-width: 768px){
    .mobileRes{
      display:inline-block !important;
    }

    .accountSave{
      top: 0px !important;
    }

    .mobilePadding {
      padding-top: 65px;
      padding-left:20px;
      padding-right:20px;
    }

    .editButton{
      position:relative;
      right:5px;
    }

    .localMobile{
      margin-bottom: 1rem !important;
    }

    .actionPanel{
      margin-bottom: 1rem;
      margin-right: 1.1rem
    }

    .control.uploadButton.level-right {
      text-align: right !important;
    }

    .column.resultMobile {
      display: block;
    }

    .column.rowHeader{
      display:none;
    }

    .columns.rowDetails{
      border: 1px solid lightgrey;
      margin-bottom: 20px !important;
    }

    .column.actionDisplay{
      display: inline-block;
    }

    .columns.reverse-row-order{
      flex-direction:row-reverse;
     }

     .detailsMobile{
      display: inline;
    }
    .detailsMobilePlugins{
      display: block;
    }

      .column.is-2.actionDisplay {
        float: right;
    }

    .columns.mobileCompanies {
      margin-left: 0px;
      margin-right: 0px;
    }

    #companyAlign{
      margin-top:0px;
    }

    .selectWidth{
      width: 100%;
    }

    .box.filterMobile{
      margin-top:65px;
    }

    .exportData {
      position: relative;
      top: 5px;
      font-size: 13px;
    }

    img.imgRes{
      width: 10%;
      height: 10%;
    }

    .directoryMobile{
      display: none;
    }

    .resetKey{
      margin-top: 0px;
    }

    section.section{
      margin-bottom: 0px !important;
      padding-bottom: 15px;
      padding-top: 65px;
    }

    .Toastify__toast {
      margin-bottom: 0;
      position: relative;
      bottom: 54px;
  }

  }


  @media screen and (max-width: 420px){
    td.tdMobile{
      max-width: 60px;
      word-wrap: break-word;
      font-size: 9.5px;
    }

    th.tdMobile{
      max-width: 60px;
      word-wrap: break-word;
      font-size: 9.5px;
    }

    th.transaction-date,td.transaction-date{
      font-size: 10.5px;
      width:25%;
    }

    input[type="date"] {
      width: 100%;
    }
    
    input[type="date"]::before {
      width: 100%;
      content: attr(placeholder);
    }
    
    input[type="date"]:hover::before {
      width: 0%;
      content: "";
    }
  
    img.imgRes{
        width: 20%;
        height: 20%;
      }

    .control.uploadButton.level-right {
        text-align: center !important;
    }

    .file-name, .file-label{
      font-size:13px !important;
    }


    .uploadInput{
      flex: 1 0 45% !important;
    }

    .uploadButton{
      flex: 1 0 55% !important;
    }

    // button#uppy-open-modal {
    //   padding: 9px 5px !important;
    // }

    .resetPassInput{
      flex: 1 0 35% !important;
    }

    .resetPassButton{
      flex: 1 0 65% !important;
    }

    .checkboxMobile{
      display: block !important;
    }

    .modal-content{
      width: 95% !important;
    }

    .resetMobile .field.has-addons {
      display: block !important;
    }

    .Toastify__toast {
      margin-bottom: 0;
      width: 222px;
      font-size: 14px;
      left: 138px;
  }

  .dropdown .dropdown-trigger button, .dropdown-width {
    transform: scale(0.8);
  }

  .dropdown-menu {
    top: 65% !important;
  }

}

  .column.localMobile {
    margin-right: 10px !important;
  }


  .activeIndicator{
    border:1px solid #000;
    width:20px;
    height:20px;
    border-radius:50%;
    background-color:#00d1b2;
    display:inline-block;
  }

  .exportData{
    padding-top:10px;
  }

  .selectSize{
    position:relative;
    bottom:7px;
  }


  .buttonAlign{
    margin-right: 12px;
    margin-bottom:50px;
  }

  .physicalAdd{
    padding-left:20px !important;
  }


  .a-button{
    background-color:#00d1b2;
    padding: 10px 15px;
    color:white;
    border-radius:5px;
  }

  .a-button:hover{
    color:white;
  }

  .accountSave{
    position:relative;
    top:10px;
    right:5px;
  }
  
  label{
    font-family: 'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
    margin-bottom: 5px;
  }

  .file-name, .file-label,p{
    font-family: 'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
  }

  .file-name{
    color:grey !important;
  }

 input::-webkit-input-placeholder{
    color:grey !important;
  }

  .currenciesContainer{
    margin-top: 20px;
    padding:10px 40px 10px 10px;
    background-color:	#F0F0F0;
  }

.headingMargin{
  margin-bottom:20px;
}

.btn-submit {
  width: 100%;
  border-radius: 0;
  height: 48px;
  background: #365e9d !important;
  text-transform: uppercase;
}

.field.fieldMargin {
  margin-bottom: 25px !important;
}

  .navbar-burger {
    color: #fff !important;
  }


  @media screen and (max-width: 1087px) {
    body.has-navbar-fixed-bottom {
      padding-bottom: 0;
    }
  }

  .container.plugins{
    margin-bottom:70px;
  }
  
  .transactions-odd-row {
    background-color:#EFF7FC;
  }

  .dropdown-menu {
    z-index: 40 !important;
  }

  // .has-fixed-help-height .field .control {
  //   min-height: 58px;
  // }

  .inputSpaces{
    margin-top:20px
  }

  .row-justify-content-flex-end {
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
  }

  .Toastify__toast-container--top-right {
    top: calc(1em + 90px) !important;
  }

  .input-group {
    position: relative;
    display: inline-block;
  }

  .input-group > input {
    padding-right: 37px;
  }

  .input-group > .button {
    position: absolute;
    top: 0;
    right: 0;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    z-index: 10;
  }

  .column-header-p {
    display: flex;
    justify-content: space-between;
  }

  .hoverable {
    cursor: pointer;
  }

  .active-sorting-column {
    border-bottom: 2px solid white;
  }

  table.double-rows tbody tr:nth-child(4n), table.double-rows tbody tr:nth-child(4n-1) {
    background: white;
  }
  
  table.double-rows tbody tr:nth-child(4n-2), table.double-rows tbody tr:nth-child(4n-3) {
    background: rgba(98, 181, 229, 0.1);
  }

  table.double-rows tr.hidden {
    display: none;  
  }

  @media(max-width: 1087px) {
    button.logout.white.is-text.button {
      color: #365e9d;
      padding-left:0;
      text-decoration:none;
    }
  }

 

  @media(min-width: 769px) and (max-width: 1024px ) {
    .Toastify__toast {
      bottom: 56px;
    }
  }

  @media(min-width: 401px) and (max-width: 420px ) {
    .Toastify__toast {
        left: 192px;
    }
  }

  @media(min-width: 361px) and (max-width: 375px ) {
    .Toastify__toast {
        left: 153px;
    }
  }

  @media (max-width: 320px ) {
    .Toastify__toast {
        left: 98px;
    }
  }

`;
