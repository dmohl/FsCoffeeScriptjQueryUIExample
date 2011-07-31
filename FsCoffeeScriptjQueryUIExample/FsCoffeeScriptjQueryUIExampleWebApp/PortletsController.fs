namespace MsdnWeb.Controllers

open System.Web
open System.Web.Mvc

[<HandleError>]
type PortletsController() =
    inherit Controller()
    member this.Index () : ActionResult =
        this.View() :> ActionResult
