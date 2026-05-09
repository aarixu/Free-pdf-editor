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

    openFirewall = lib.mkOption {
      type = lib.types.bool;
      default = false;
      description = "Whether to open the firewall port.";
    };
  };

  config = lib.mkIf cfg.enable {
    nixpkgs.overlays = [
      (final: prev: {
        freepdf = final.callPackage ./package.nix { };
      })
    ];

    systemd.services.freepdf = {
      description = "FreePDF PDF Tools";
      after = [ "network.target" ];
      wantedBy = [ "multi-user.target" ];

      environment = {
        PDFCRAFT_PORT = toString cfg.port;
      };

      serviceConfig = {
        ExecStart = "${cfg.package}/bin/freepdf";
        Restart = "on-failure";
        DynamicUser = true;
        RuntimeDirectory = "freepdf";
        StateDirectory = "freepdf";

        # Hardening
        NoNewPrivileges = true;
        ProtectSystem = "strict";
        ProtectHome = true;
        PrivateTmp = true;
        PrivateDevices = true;
        ProtectKernelTunables = true;
        ProtectKernelModules = true;
        ProtectControlGroups = true;
        RestrictSUIDSGID = true;
        MemoryDenyWriteExecute = false;
      };
    };

    networking.firewall.allowedTCPPorts = lib.mkIf cfg.openFirewall [ cfg.port ];
  };
}
