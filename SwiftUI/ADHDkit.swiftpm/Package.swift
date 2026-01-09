// swift-tools-version: 5.9

import PackageDescription

let package = Package(
    name: "ADHDkit",
    platforms: [
        .iOS(.v17),
        .macOS(.v14)
    ],
    products: [
        .library(
            name: "ADHDkit",
            targets: ["ADHDkit"])
    ],
    targets: [
        .target(
            name: "ADHDkit")
    ]
)
