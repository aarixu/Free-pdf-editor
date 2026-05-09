{
  description = "FreePDF - Professional PDF Tools, Free, Private & Browser-Based";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    let
      supportedSystems = [ "x86_64-linux" "aarch64-linux" ];

      # Overlay that provides freepdf package on any system
      overlay = final: prev: {
        freepdf = final.callPackage ./nix/package.nix { };
      };
    in
    {
      # NixOS module
      nixosModules.default = import ./nix/nixos-module.nix;
      nixosModules.freepdf = self.nixosModules.default;

      # Home-manager module
      homeManagerModules.default = import ./nix/hm-module.nix;
      homeManagerModules.freepdf = self.homeManagerModules.default;

      # Overlay
      overlays.default = overlay;
    }
    //
    flake-utils.lib.eachSystem supportedSystems (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ overlay ];
        };
      in
      {
        packages = {
          freepdf = pkgs.freepdf;
          default = pkgs.freepdf;
        };

        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_22
            nginx
          ];
        };
      }
    );
}
