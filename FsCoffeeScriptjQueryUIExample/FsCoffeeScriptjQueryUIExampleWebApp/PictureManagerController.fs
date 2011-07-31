namespace MsdnWeb.Controllers

open System.Web
open System.Web.Mvc

[<HandleError>]
type PictureManagerController() =
    inherit Controller()
    member this.Index () : ActionResult =
        this.View() :> ActionResult


