# Variables para AWS y los nombres de los binarios
APP_NAME := env_generator
BIN_DIR := ./bin
AWS_S3_BUCKET := mercado-pago-ar-icontactx
LINUX_AMD64_BIN := $(BIN_DIR)/$(APP_NAME)_linux_amd64
LINUX_ARM64_BIN := $(BIN_DIR)/$(APP_NAME)_linux_arm64
WINDOWS_BIN := $(BIN_DIR)/$(APP_NAME)_windows.exe
DARWIN_AMD64_BIN := $(BIN_DIR)/$(APP_NAME)_darwin_amd64
DARWIN_ARM64_BIN := $(BIN_DIR)/$(APP_NAME)_darwin_arm64

# Detectar el sistema operativo y arquitectura
ifeq ($(OS),Windows_NT)
    UNAME_S := Windows
    SHELL := powershell.exe
    .SHELLFLAGS := -Command
else
    UNAME_S := $(shell uname -s)
    ARCH := $(shell uname -m)
endif

# Regla para imprimir el sistema operativo y arquitectura
detect-os-arch:
	@echo "Operating system detected: $(UNAME_S)"
	@echo "Architecture detected: $(ARCH)"

# Ejecutar el binario correspondiente según el sistema operativo y la arquitectura
go-run:
ifeq ($(UNAME_S),Linux)
	@if [ "$(ARCH)" = "x86_64" ]; then \
		echo "Running Linux AMD64 binary"; \
		$(LINUX_AMD64_BIN); \
	elif [ "$(ARCH)" = "aarch64" ]; then \
		echo "Running Linux ARM64 binary"; \
		$(LINUX_ARM64_BIN); \
	else \
		echo "Unsupported Linux architecture"; \
	fi
else ifeq ($(UNAME_S),Darwin)
	@if [ "$(ARCH)" = "x86_64" ]; then \
		echo "Running macOS Intel binary"; \
		$(DARWIN_AMD64_BIN); \
	elif [ "$(ARCH)" = "arm64" ]; then \
		echo "Running macOS ARM binary"; \
		$(DARWIN_ARM64_BIN); \
	fi
else ifeq ($(UNAME_S),Windows)
	@echo "Running Windows binary"
	./$(WINDOWS_BIN)
else
	@echo "Unsupported OS"
endif

# Limpiar los binarios generados
go-clean:
	rm -rf $(BIN_DIR)
	@echo "Go binaries cleaned"

# Compilar los binarios para cada plataforma
go-build: $(BIN_DIR)
	GOOS=linux GOARCH=amd64 go build -o $(LINUX_AMD64_BIN) main.go
	GOOS=linux GOARCH=arm64 go build -o $(LINUX_ARM64_BIN) main.go
	GOOS=windows GOARCH=amd64 go build -o $(WINDOWS_BIN) main.go
	GOOS=darwin GOARCH=amd64 go build -o $(DARWIN_AMD64_BIN) main.go
	GOOS=darwin GOARCH=arm64 go build -o $(DARWIN_ARM64_BIN) main.go

# Crear el directorio de binarios si no existe
$(BIN_DIR):
	mkdir -p $(BIN_DIR)

# Compilar el proyecto React.js
build-react:
	pnpm run build

# testing
dev-react:
	pnpm run dev

# Actualizar archivos en S3 usando la variable del bucket S3
update:
	aws s3 sync dist/ s3://$(AWS_S3_BUCKET)/
	aws s3 ls s3://$(AWS_S3_BUCKET)/

# Configurar AWS CLI
aws-config:
	aws configure

# Verificar la identidad de AWS
aws-identity:
	aws sts get-caller-identity

# Comando por defecto
all: go-run build-react update

dev: go-run dev-react
