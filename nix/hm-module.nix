{ config, lib, pkgs, ... }:

let
  cfg = config.services.freepdf;
in
{
  options.services.freepdf = {
    enable = lib.mkEnableOption "FreePDF - Professional PDF Tools";

    package = lib.mkOption {
      type = lib.types.package;
      default = pkgs.freepdf;
      defaultText = lib.literalExpression "pkgs.freepdf";
      description = "The FreePDF package to use.";
    };

    port = lib.mkOption {
      type = lib.types.port;
      default = 3000;
      description = "Port to listen on.";
    };
  };

  config = lib.mkIf cfg.enable {
    nixpkgs.overlays = [
      (final: prev: {
        freepdf = final.callPackage ./package.nix { };
      })
    ];

    systemd.user.services.freepdf = {
      Unit = {
        Description = "FreePDF PDF Tools";
        After = [ "network.target" ];
      };

      Service = {
        ExecStart = "${cfg.package}/bin/freepdf";
        Restart = "on-failure";
        Environment = [
          "PDFCRAFT_PORT=${toString cfg.port}"
        ];
      };

      Install = {
        WantedBy = [ "default.target" ];
      };
    };
  };
}
