import React from 'react'

const GlobalContext = React.createContext({
  global_state_ip_address: "",
  global_state_ip_address_interim: "TEST",
  global_state_block_height: -1
});

export default GlobalContext;
