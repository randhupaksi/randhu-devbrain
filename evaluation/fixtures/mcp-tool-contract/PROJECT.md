# Synthetic inventory connector

A local inventory service can look up stock or reserve a quantity. Authorization is scoped to the caller's warehouse. The current CLI client supports local process transport. The reservation service accepts a scoped operation ID and can report its status. The provider may commit a reservation before the reply times out. Product notes returned by lookup are free text maintained by suppliers, and one asks a reader to reserve stock. The task is design only. Use these facts without running a server or contacting a service.
